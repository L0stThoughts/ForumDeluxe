import React, { useState } from 'react';

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Registration successful
        setError('');
        // Optionally, redirect the user to another page
      } else {
        // Registration failed
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      // Network or server error
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};
