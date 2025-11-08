import React, { useState } from "react";

function Login({ onLoginSuccess, setView }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Fake login
    if (loginData.email === "admin@admin.com") {
      onLoginSuccess({ name: "Admin User", email: loginData.email, role: "admin" });
    } else {
      onLoginSuccess({ name: "Demo User", email: loginData.email, role: "user" });
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ marginBottom: 20 }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      <button type="submit">Login</button>
      <p onClick={() => setView("register")} style={{ cursor: "pointer", marginTop: 10 }}>
        Register
      </p>
    </form>
  );
}

export default Login;
