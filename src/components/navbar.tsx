import "../scss/bootstrap.scss";
import skullImg from "../images/skull.png";
import React, { useState } from "react";
import { LoginForm } from "./login/LoginForm";
import { useAuth } from "./profile/AuthContent";
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
      <img src={skullImg} width="30" height="30" alt="NAURRRRRRR" />
      <a className="navbar-brand ms-3" href="../">
        Věčná Ječná
      </a>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          {isLoggedIn ? (
            <li className="nav-item dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle"
                onClick={toggleDropdown}
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen ? "true" : "false"}
              >
                Profile
              </button>
              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/profile" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
                <button className="dropdown-item" onClick={logout}>
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <LoginForm />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
