// src/pages/AdminLogin.js
import React, { useState, useEffect } from "react";

function AdminLogin({ onLogin, language }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  // Default admin credentials
  const defaultAdmin = {
    email: "admin@domain.com",
    password: "Admin@123",
  };

  // Load credentials from localStorage or use default
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem("adminCredentials");
    return saved ? JSON.parse(saved) : defaultAdmin;
  });

  // Save updated credentials to localStorage
  useEffect(() => {
    localStorage.setItem("adminCredentials", JSON.stringify(credentials));
  }, [credentials]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === credentials.email && password === credentials.password) {
      onLogin(true); // Set admin logged in
      alert(language === "en" ? "✅ Logged in as Admin" : "✅ እንኳን አስተዳዳሪ እንደገና ገቡት");
      setEmail("");
      setPassword("");
    } else {
      alert(language === "en" ? "❌ Invalid credentials." : "❌ የተሳሳተ መለያ/የይለፍ ቃል");
    }
  };

  // Handle password reset
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert(language === "en" ? "❌ Password must be at least 6 characters." : "❌ የይለፍ ቃል ከ6 ቁምፊ ቢያነስ መሆን አለበት።");
      return;
    }
    setCredentials({ ...credentials, password: newPassword });
    setNewPassword("");
    setIsResetMode(false);
    alert(language === "en" ? "✅ Password has been updated!" : "✅ የይለፍ ቃል ተቀይሯል!");
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4f8" }}>
      <div style={{ padding: 40, background: "white", borderRadius: 10, boxShadow: "0 5px 15px rgba(0,0,0,0.2)", width: 350 }}>
        {!isResetMode ? (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>{language === "en" ? "Admin Login" : "አስተዳዳሪ ግባ"}</h2>
            <form onSubmit={handleLogin}>
              <label>{language === "en" ? "Email:" : "ኢሜል:"}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={language === "en" ? "Enter email" : "ኢሜል ያስገቡ"}
                style={{ width: "100%", padding: 10, margin: "8px 0 15px", borderRadius: 5, border: "1px solid #ccc" }}
              />

              <label>{language === "en" ? "Password:" : "የይለፍ ቃል:"}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={language === "en" ? "Enter password" : "የይለፍ ቃል ያስገቡ"}
                  style={{ width: "100%", padding: 10, margin: "8px 0 15px", borderRadius: 5, border: "1px solid #ccc" }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 10, top: 12, cursor: "pointer", fontSize: 12, color: "#555" }}
                >
                  {showPassword ? (language === "en" ? "Hide" : "ደብቀ") : (language === "en" ? "Show" : "አሳይ")}
                </span>
              </div>

              <button
                type="submit"
                style={{ width: "100%", padding: 12, background: "teal", color: "white", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16 }}
              >
                {language === "en" ? "Login" : "ግባ"}
              </button>
            </form>
            <p
              style={{ marginTop: 15, cursor: "pointer", color: "blue", textAlign: "center" }}
              onClick={() => setIsResetMode(true)}
            >
              {language === "en" ? "Forgot / Reset Password?" : "የይለፍ ቃል ረሳዎት / አዲስ ይቀይሩ"}
            </p>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>{language === "en" ? "Reset Password" : "የይለፍ ቃል አዲስ አድርግ"}</h2>
            <form onSubmit={handleResetPassword}>
              <label>{language === "en" ? "New Password:" : "አዲስ የይለፍ ቃል:"}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder={language === "en" ? "Enter new password" : "አዲስ የይለፍ ቃል ያስገቡ"}
                style={{ width: "100%", padding: 10, margin: "8px 0 15px", borderRadius: 5, border: "1px solid #ccc" }}
              />
              <button
                type="submit"
                style={{ width: "100%", padding: 12, background: "orange", color: "white", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16 }}
              >
                {language === "en" ? "Update Password" : "የይለፍ ቃል አስተካክል"}
              </button>
            </form>
            <p
              style={{ marginTop: 15, cursor: "pointer", color: "blue", textAlign: "center" }}
              onClick={() => setIsResetMode(false)}
            >
              {language === "en" ? "Back to Login" : "ወደ ግባ ተመለስ"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
