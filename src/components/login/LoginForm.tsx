import React, { useState } from "react";
import "../../scss/bootstrap.scss";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful
        setError("");
        // Optionally, redirect the user to another page
      } else {
        // Login failed
        const data = await response.json();
        setError(data.message || "Login failed");
      }
    } catch (error) {
      // Network or server error
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <div className="row mx-0">
        <div className="col-8 px-0 d-flex">
          <div className="form-group mb-0 flex-grow-1">
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              className="form-control form-control-sm rounded-0"
            />
          </div>
          <div className="form-group mb-0 flex-grow-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control form-control-sm rounded-0"
            />
          </div>
        </div>
        <div className="col-4 px-0 d-flex">
          <button
            type="submit"
            className="btn btn-dark btn-sm border-none rounded-0 flex-grow-1 me-1"
          >
            Login
          </button>
          <button
            type="submit"
            className="btn btn-dark btn-sm border-none rounded-0 flex-grow-1"
          >
            Register?
          </button>
        </div>
      </div>
      {error && <p className="mx-2">{error}</p>}
    </form>
  );
};
