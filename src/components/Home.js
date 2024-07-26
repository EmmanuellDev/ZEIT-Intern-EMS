// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Employee Management System</h2>
      <div className="button-container">
        <Link to="/admin-login" className="login-button">
          Admin Login <span className="arrow">→</span>
        </Link>
        <Link to="/employee-login" className="login-button">
          Employee Login <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
