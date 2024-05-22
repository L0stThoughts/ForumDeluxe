import React from "react";
import "./forum.scss";

interface ThreadProps {
  thread: {
    title: string;
    content: string;
    category: string;
  };
}

const Thread: React.FC<ThreadProps> = ({ thread }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{thread.title}</h5>
        <p className="card-text">{thread.content}</p>
      </div>
    </div>
  );
};

export default Thread;
