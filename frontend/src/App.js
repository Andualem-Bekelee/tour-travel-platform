import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import BookingForm from "./pages/BookingForm";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import AdminDashboard from "./pages/AdminDashboard";
import AddTour from "./pages/AddTour";
import EditTour from "./pages/EditTour";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  const [language, setLanguage] = useState("en"); // "en" or "am"

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    alert(language === "en" ? "✅ Logged out!" : "✅ ውጤት እንደገና ተጠፋ!");
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "am" : "en");

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(0,0,0,0.7)",
    padding: "10px 20px",
    borderRadius: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  };
  const navLinksStyle = { display: "flex", gap: 15, flexWrap: "wrap", alignItems: "center" };
  const linkStyle = { color: "white", textDecoration: "none", fontWeight: "bold" };

  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Navigation */}
        <nav style={navStyle}>
          <h2 style={{ color: "white", margin: 0 }}>🌍 Tour & Travel</h2>
          <div style={navLinksStyle}>
            <Link to="/" style={linkStyle}>{language === "en" ? "Home" : "መነሻ"}</Link>
            <Link to="/tours" style={linkStyle}>{language === "en" ? "Tours" : "ጉብኝቶች"}</Link>

            {isLoggedIn ? (
              <>
                <Link to="/admin" style={linkStyle}>{language === "en" ? "Admin Dashboard" : "አስተዳዳሪ ዳሽቦርድ"}</Link>
                <button
                  onClick={handleLogout}
                  style={{ ...linkStyle, background: "transparent", border: "none", cursor: "pointer" }}
                >
                  {language === "en" ? "Logout" : "ውጣ"}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>{language === "en" ? "Login" : "ግባ"}</Link>
                <Link to="/createaccount" style={linkStyle}>{language === "en" ? "Create Account" : "መለያ ፍጠር"}</Link>
              </>
            )}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              style={{
                marginLeft: 10,
                padding: "5px 10px",
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
                background: "teal",
                color: "white",
              }}
            >
              {language === "en" ? "AM" : "EN"}
            </button>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/tours" element={<Tours language={language} isAdmin={isLoggedIn} />} />
          <Route path="/book/:id" element={<BookingForm language={language} />} />
          <Route path="/adminlogin" element={<AdminLogin onLogin={setIsLoggedIn} language={language} />} />
          <Route path="/login" element={<Login onLogin={setIsLoggedIn} language={language} />} />
          <Route path="/createaccount" element={<CreateAccount language={language} />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminDashboard language={language} /> : <AdminLogin onLogin={setIsLoggedIn} language={language} />}
          />
          <Route
            path="/addtour"
            element={isLoggedIn ? <AddTour language={language} /> : <AdminLogin onLogin={setIsLoggedIn} language={language} />}
          />
          <Route
            path="/admin/edit/:id"
            element={isLoggedIn ? <EditTour language={language} /> : <AdminLogin onLogin={setIsLoggedIn} language={language} />}
          />
        </Routes>

        {/* Footer */}
        <footer style={{ textAlign: "center", marginTop: 50, padding: 10, background: "#222", color: "#ccc", borderRadius: 8 }}>
          <p>
            © {new Date().getFullYear()} {language === "en" ? "Tour & Travel Platform. All rights reserved." : "ጉብኝት እና ትራቭል ፕላትፎርም። መብት ሁሉ የተጠበቀ ነው።"}
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
