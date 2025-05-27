import React, { useState, useEffect } from "react";
import { useUserStore } from "../store";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = localStorage.getItem(username);
    if (!userData) {
      alert("Please register");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.password === password) {
      login(parsedUser);
      navigate("/");
    } else {
      alert("Bad Credentials");
    }
  };

  return (
    <div>
  
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit" id="login-btn">
          Submit
        </button>
        &nbsp; <Link to="/register">Register</Link>
      </form>
    </div>
  );
}
