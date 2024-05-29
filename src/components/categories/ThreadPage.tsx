import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  link: string;
}

interface Reply {
  id: number;
  thread_id: number;
  content: string;
}

const ThreadPage: React.FC = () => {
  const { link } = useParams<{ link: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState<string>('');

  useEffect(() => {
    console.log('Fetching thread with link:', link);
    fetch(`http://localhost:5000/api/threads/${link}`)
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Thread data received:', data);
        setThread(data);
      })
      .catch(error => console.error('Error fetching thread:', error));
  }, [link]);

  useEffect(() => {
    if (thread) {
      console.log('Fetching replies for thread:', thread.id);
      fetch(`http://localhost:5000/api/replies/${thread.id}`)
        .then(response => {
          console.log('Replies response status:', response.status);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Replies data received:', data);
          setReplies(data);
        })
        .catch(error => console.error('Error fetching replies:', error));
    } else {
      console.log('Thread is null or undefined, skipping fetch for replies.');
    }
  }, [thread]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (thread && thread.id) {
      const payload = { threadId: thread.id, content: replyContent };
      console.log('Sending payload:', payload);

      const response = await fetch('http://localhost:5000/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('Error creating reply:', await response.text());
        return;
      }

      const data = await response.json();
      setReplies([...replies, data]);
      setReplyContent('');
    } else {
      console.error('Thread is null or thread.id is undefined when submitting reply');
    }
  };

  return (
    <div className="container mt-5 text-light">
      {thread ? (
        <>
          <h1>{thread.title}</h1>
          <p>{thread.content}</p>
          <h2>Replies</h2>
          <ul>
            {replies.map(reply => (
              <li key={reply.id}>{reply.content}</li>
            ))}
          </ul>
          <form onSubmit={handleReplySubmit}>
            <div className="mb-3">
              <label htmlFor="replyContent" className="form-label">
                Reply
              </label>
              <textarea
                className="form-control"
                id="replyContent"
                rows={3}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-dark">
              Post Reply
            </button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ThreadPage;
