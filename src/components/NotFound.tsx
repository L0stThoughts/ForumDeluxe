import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ marginTop: "-140px" }}>
      <h1 className="text-white">404 - Page Not Found</h1>
      <p className="text-white">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-dark">Go Home</Link>
    </div>
  );
};

export default NotFound;
