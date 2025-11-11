import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Signup.css"; // Custom styles

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      alert("Signup successful!");
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="linkedin-title">Linked<span>In</span></h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Make the most of your professional life
        </h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (6 or more characters)"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Agree & Join
          </button>
        </form>

        <p className="text-gray-700 text-sm mt-4">
          Already on LinkedIn?{" "}
          <span className="signin" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
