import React from 'react';
import { Link } from 'react-router-dom';
import './forum.scss';

interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  link: string;
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div className="post-list">
      {threads.map((thread) => (
        <div key={thread.id} className="post">
          <Link to={thread.link}>{thread.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
