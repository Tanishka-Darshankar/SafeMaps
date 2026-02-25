import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { API_BASE } from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ ${data.message || "Registration failed"}`);
        return;
      }

      alert("✅ Registration successful!");
      navigate("/"); // go to login
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create Account 💫</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-box"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-box"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-box"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
