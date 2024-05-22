import "../scss/bootstrap.scss";
import skullImg from "../images/skull.png";
import React from "react";
import { LoginForm } from "./login/LoginForm";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
      <img src={skullImg} width="30" height="30" alt="NAURRRRRRR" />
      <a className="navbar-brand ms-3" href="../">
        Věčná Ječná
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <LoginForm />
          </li>
        </ul>
      </div>
    </nav>
  );
};
