import React, { useState } from "react";
import "../../scss/bootstrap.scss";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../profile/AuthContent";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/profile");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-inline m-0">
        <div className="row mx-0">
          <div className="col-8 px-0 d-flex">
            <div className="form-group mb-0 flex-grow-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="form-control form-control-sm rounded-0"
                required
              />
            </div>
            <div className="form-group mb-0 flex-grow-1">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control form-control-sm rounded-0"
                required
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
              type="button"
              className="btn btn-dark btn-sm border-none rounded-0 flex-grow-1 me-1"
              onClick={handleRegisterClick}
            >
              Register?
            </button>
          </div>
        </div>
        {error && <p className="px-0 text-light">{error}</p>}
      </form>
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
};
