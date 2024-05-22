import React, { useState } from "react";
import "./forum.scss";

interface NewThreadFormProps {
  addThread: (thread: { title: string; content: string }) => void;
}

const NewThread: React.FC<NewThreadFormProps> = ({ addThread }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addThread({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="content"
          rows={3}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Post Thread
      </button>
    </form>
  );
};

export default NewThread;
