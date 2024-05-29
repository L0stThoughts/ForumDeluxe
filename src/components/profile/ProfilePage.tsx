import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContent.tsx";
import "../../scss/bootstrap.scss";

const ProfilePage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !user) return null;

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <h1>Profile Page</h1>
      <img src="path_to_default_pfp_icon" alt="Profile Picture" /> {/* Replace with actual path */}
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Password: ******</p>
    </div>
  );
};

export default ProfilePage;
