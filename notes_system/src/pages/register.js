import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Password & confirm password Mismatch");
      return;
    }

    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert("Username already exists");
      return;
    }

    const user = {
      name,
      username,
      password,
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="body-container">
        <section className="login">
            <h1>Register here</h1>
            <form id="registerForm" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name"id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type="password" placeholder="Confirm Password" id="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/><br/>
                <div>
                    <button type="submit" id="register-btn">Register</button>
                    &nbsp; <Link to="/login">Login</Link>
                </div>
            </form>
        </section>
    </div>
  );
}
