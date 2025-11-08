// src/pages/CreateAccount.js
import React, { useState } from "react";
import axios from "axios";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      // 👇 Example: Replace with your actual backend signup API endpoint
      await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage("✅ Account created successfully!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create account. Try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/background6.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>🧍 Create Account</h2>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#00bfa6",
            color: "white",
            border: "none",
            padding: "10px 0",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            marginTop: 15,
          }}
        >
          Create Account
        </button>

        {message && (
          <p style={{ textAlign: "center", marginTop: 15, color: "#ffcc00" }}>{message}</p>
        )}
      </form>
    </div>
  );
};

// Reusable input style
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};

export default CreateAccount;
