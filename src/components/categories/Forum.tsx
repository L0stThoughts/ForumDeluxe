import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from './ThreadList';
import NewThread from './NewThread';
import "./forum.scss";

interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  link: string;
}

const randomString = Math.random().toString(36).substring(2, 15);

const generateRandomLink = (category: string) => {
  return `/category/${category}/${randomString}`;
};

const Forum: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const category = categoryName as string;

  const [threads, setThreads] = useState<Thread[]>([]); // Initialize as array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    fetch(`http://localhost:5000/api/threads/${category}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setThreads(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching threads:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [category]);

  const addThread = async (thread: Omit<Thread, 'category' | 'link' | 'id'>) => {
    const newThread: Thread = { ...thread, category, link: randomString, id: 0 };
    const response = await fetch('http://localhost:5000/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newThread)
    });
    const data = await response.json();
    setThreads(prevThreads => [...prevThreads, data]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredThreads = threads.filter(thread => thread.category === category);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{category} Forum</h1>
      <NewThread addThread={addThread} />
      <ThreadList threads={filteredThreads} />
    </div>
  );
};

export default Forum;
