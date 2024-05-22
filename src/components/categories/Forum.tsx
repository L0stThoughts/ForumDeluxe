import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from './ThreadList';
import NewThread from './NewThread';
import "./forum.scss";

interface Thread {
  title: string;
  content: string;
  category: string;
}

const Forum: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const category = categoryName as string;

  const [threads, setThreads] = useState<Thread[]>([]);

  const addThread = (thread: Omit<Thread, 'category'>) => {
    const newThread: Thread = { ...thread, category };
    setThreads(prevThreads => [...prevThreads, newThread]);
  };

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
