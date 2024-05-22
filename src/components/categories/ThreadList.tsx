import React from 'react';
import Thread from './Thread';
import "./forum.scss";

interface Thread {
  title: string;
  content: string;
  category: string;
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div>
      {threads.map((thread, index) => (
        <Thread key={index} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;
