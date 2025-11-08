import React, { useState } from "react";

function Register({ setView }) {
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registered ${registerData.name}!`);
    setView("login");
    setRegisterData({ name: "", email: "", password: "" });
  };

  return (
    <form onSubmit={handleRegister} style={{ marginBottom: 20 }}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={registerData.name}
        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={registerData.email}
        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
      />
      <button type="submit">Register</button>
      <p onClick={() => setView("login")} style={{ cursor: "pointer", marginTop: 10 }}>
        Back to Login
      </p>
    </form>
  );
}

export default Register;
