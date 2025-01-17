import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file (if you decide to separate it)

const Navbar = () => (
  <nav>
    <h1>Event Management</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/create-event">Create Event</Link></li>
    </ul>
  </nav>
);

export default Navbar;
