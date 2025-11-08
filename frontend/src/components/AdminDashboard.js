import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ language }) {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
    fetchBookings();
    fetchUsers();
  }, []);

  // Fetch all tours
  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tours");
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a tour
  const handleDeleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      alert("✅ Tour deleted!");
      fetchTours();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete tour.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f0f3f5" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        {language === "en" ? "Admin Dashboard" : "አስተዳዳሪ ዳሽቦርድ"}
      </h1>

      {/* Add Tour Button */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <button
          onClick={() => navigate("/addtour")}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #27ae60, #2ecc71)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {language === "en" ? "➕ Add Tour" : "➕ ጉብኝት ያክሉ"}
        </button>
      </div>

      {/* Tours Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={{ marginBottom: 15 }}>{language === "en" ? "Tours" : "ጉብኝቶች"}</h2>
        {tours.length === 0 ? (
          <p>{language === "en" ? "No tours yet." : "ጉብኝቶች አልተገኙም"}</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {tours.map((tour) => (
              <div
                key={tour._id}
                style={{
                  width: 300,
                  background: "#fff",
                  padding: 15,
                  borderRadius: 12,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <h3 style={{ margin: 0 }}>{tour.title}</h3>
                <p style={{ fontSize: 14, color: "#555" }}>{tour.description}</p>
                <p style={{ fontWeight: "bold" }}>Price: ${tour.price}</p>

                {/* Images */}
                <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
                  {tour.images && tour.images.length > 0 ? (
                    tour.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:5000${img}`}
                        alt={tour.title}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }}
                      />
                    ))
                  ) : (
                    <img
                      src="https://via.placeholder.com/80x80"
                      alt={tour.title}
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                  <button
                    onClick={() => navigate(`/admin/edit/${tour._id}`)}
                    style={{
                      padding: "5px 10px",
                      background: "#3498db",
                      color: "#fff",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {language === "en" ? "Edit" : "አርትዕ"}
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour._id)}
                    style={{
                      padding: "5px 10px",
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {language === "en" ? "Delete" : "አሰርዝ"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bookings Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={{ marginBottom: 15 }}>{language === "en" ? "Bookings" : "ቦኪንግ"}</h2>
        {bookings.length === 0 ? (
          <p>{language === "en" ? "No bookings yet." : "ቦኪንግ አልተሰሩም"}</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>{language === "en" ? "Tour" : "ጉብኝት"}</th>
                  <th style={thStyle}>{language === "en" ? "User" : "ተጠቃሚ"}</th>
                  <th style={thStyle}>{language === "en" ? "People" : "ሰዎች"}</th>
                  <th style={thStyle}>{language === "en" ? "Date" : "ቀን"}</th>
                  <th style={thStyle}>{language === "en" ? "Total Price" : "ጠቅላላ ዋጋ"}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td style={tdStyle}>{b.tour?.title}</td>
                    <td style={tdStyle}>{b.user?.name}</td>
                    <td style={tdStyle}>{b.people}</td>
                    <td style={tdStyle}>{new Date(b.date).toLocaleDateString()}</td>
                    <td style={tdStyle}>${b.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Users Section */}
      <section>
        <h2 style={{ marginBottom: 15 }}>{language === "en" ? "Users" : "ተጠቃሚዎች"}</h2>
        {users.length === 0 ? (
          <p>{language === "en" ? "No users yet." : "ተጠቃሚ አልተገኙም"}</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>{language === "en" ? "Name" : "ስም"}</th>
                  <th style={thStyle}>{language === "en" ? "Email" : "ኢሜይል"}</th>
                  <th style={thStyle}>{language === "en" ? "Role" : "ሚና"}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td style={tdStyle}>{u.name}</td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// Styles for tables
const thStyle = { border: "1px solid #ccc", padding: 10, background: "#ecf0f1" };
const tdStyle = { border: "1px solid #ccc", padding: 10 };

export default AdminDashboard;
