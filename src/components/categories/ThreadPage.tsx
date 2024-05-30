import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        console.log("Fetching thread with link:", link);
        const response = await fetch(`http://localhost:5000/api/threads/${link}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Thread data received:", data); // Debugging
        setThread(data);
      } catch (error) {
        setError("Failed to fetch thread");
        console.error("Error fetching thread:", error); // Debugging
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [link]);


  //funguje
  useEffect(() => {
    const fetchReplies = async () => {
      if (thread) {
        try {
          console.log("Fetching replies for thread with link:", link);
          const response = await fetch(`http://localhost:5000/api/replies/${link}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Replies data received:", data); // Debugging
          setReplies(data);
        } catch (error) {
          setError("Failed to fetch replies");
          console.error("Error fetching replies:", error); // Debugging
        }
      }
    };

    fetchReplies();
  }, [link, thread]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (thread && thread.id) {
      const payload = { threadId: thread.id, content: replyContent };
      try {
        const response = await fetch('http://localhost:5000/api/replies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error("Failed to create reply");
        }
        const data = await response.json();
        setReplies([...replies, data]);
        setReplyContent('');
      } catch (error) {
        console.error("Error creating reply:", error); // Debugging
      }
    }
  };

  if (loading) {
    return <div className="container mt-5 text-light">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-light">{error}</div>;
  }

  return (
    <div className="container mt-5 text-light">
      {thread ? (
        <>
          <h1>{thread.title}</h1>
          <p>{thread.content}</p>
          <h2>Replies</h2>
          <ul>
            {replies.map((reply) => (
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
