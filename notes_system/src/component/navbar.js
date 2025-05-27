import React from 'react'
import {Link} from "react-router-dom";
import "./navbar.css";

const navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">NoteKeeper</h2>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default navbar
