// src/components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    alert("❌ You must be logged in as Admin to access this page.");
    return <Navigate to="/adminlogin" />;
  }
  return children;
}

export default AdminRoute;
