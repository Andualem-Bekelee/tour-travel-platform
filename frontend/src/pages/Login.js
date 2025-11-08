// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, language }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Demo: If using backend
      // const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      // const token = res.data.token;
      // localStorage.setItem("adminToken", token);

      // Demo credentials for testing
      if (email === "admin@domain.com" && password === "Admin@123") {
        localStorage.setItem("adminToken", "demoToken123");
        onLogin(true); // update App.js state
        alert(language === "en" ? "✅ Logged in successfully!" : "✅ በስኬት ገብተዋል!");
        navigate("/admin"); // or any private route
      } else {
        alert(language === "en" ? "❌ Invalid credentials." : "❌ የተሳሳተ መለያ/ፕስወርድ");
      }
    } catch (err) {
      console.error(err);
      alert(language === "en" ? "❌ Login failed." : "❌ ግባ አልተሳካም");
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4f8" }}>
      <div style={{ padding: 40, background: "white", borderRadius: 10, boxShadow: "0 5px 15px rgba(0,0,0,0.2)", width: 350 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>{language === "en" ? "Admin Login" : "አስተዳዳሪ ግባ"}</h2>
        <form onSubmit={handleSubmit}>
          <label>{language === "en" ? "Email:" : "ኢሜል:"}</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={language === "en" ? "Enter email" : "ኢሜል አስገባ"}
            style={{ width: "100%", padding: 10, margin: "8px 0 15px", borderRadius: 5, border: "1px solid #ccc" }}
          /><br />
          <label>{language === "en" ? "Password:" : "ፕስወርድ:"}</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={language === "en" ? "Enter password" : "ፕስወርድ አስገባ"}
            style={{ width: "100%", padding: 10, margin: "8px 0 15px", borderRadius: 5, border: "1px solid #ccc" }}
          /><br /><br />
          <button type="submit" style={{ width: "100%", padding: 12, background: "teal", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>
            {language === "en" ? "Login" : "ግባ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
