import "../scss/bootstrap.scss";
import skullImg from "../images/skull.png";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <img src={skullImg} width="30" height="30" alt="NAURRRRRRR"></img>
      <a className="navbar-brand ms-3" href="#">
        Věčná Ječná
      </a>
      <div className="dropdown">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>

      <div
        className="collapse navbar-collapse justify-content-end me-3"
        id="navbarNav"
      >
        <ul className="navbar-nav ">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Chat box
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
