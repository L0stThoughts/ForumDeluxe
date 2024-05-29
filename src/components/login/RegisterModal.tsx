import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './modal.scss';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTOS, setAgreeTOS] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreeTOS) {
      setError('You must agree to the Terms of Service');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
      });

      if (response.ok) {
        setError('');
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="tos-checkbox">
            <input
              type="checkbox"
              checked={agreeTOS}
              onChange={e => setAgreeTOS(e.target.checked)}
              required
            />
            I have read and agree to the <Link to="/tos" target="_blank">Terms of Service</Link>
          </div>
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
