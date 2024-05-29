import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.scss';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const Chat: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ username: string, message: string }[]>([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/profile', {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          if (data.username) {
            setUsername(data.username);
          } else {
            console.error('User not logged in');
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });

      socket.on('receiveMessage', (data: { username: string, message: string }) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }, []);

    const sendMessage = () => {
      if (message.trim()) {
        socket.emit('sendMessage', { message });
        setMessage('');
      }
    };

    return (
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    );
};

export default Chat;
