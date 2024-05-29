import React, { useEffect } from "react";
import { useAuth } from "./AuthContent.tsx";
import "../../scss/bootstrap.scss";
import DefaultPFP from "../../images/defaultPFP.png";

const ProfilePage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user) return null;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-140px" }}>
      <div className="text-center text-white border border-light p-5" >
        <h1>Profile Page</h1>
        <img src={DefaultPFP} alt="Profile Picture" className="mb-1" style={{ width: "50%", height: "100px" }} />
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Password: ******</p>
      </div>
    </div>
  );
};

export default ProfilePage;
