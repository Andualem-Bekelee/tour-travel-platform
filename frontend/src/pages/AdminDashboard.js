// src/pages/AdminDashboard.js
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

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tours");
      setTours(res.data);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      alert("✅ Tour deleted successfully!");
      fetchTours();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete tour.");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background: "#f9fafc",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: 30,
          color: "#2c3e50",
        }}
      >
        {language === "en" ? "Admin Dashboard" : "አስተዳዳሪ ዳሽቦርድ"}
      </h1>

      {/* Add Tour Button */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <button
          onClick={() => navigate("/addtour")}
          style={{
            padding: "10px 25px",
            background: "linear-gradient(135deg, #27ae60, #2ecc71)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {language === "en" ? "➕ Add Tour" : "➕ ጉብኝት ያክሉ"}
        </button>
      </div>

      {/* Tours Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={{ marginBottom: 15, color: "#34495e" }}>
          {language === "en" ? "Available Tours" : "ያሉ ጉብኝቶች"}
        </h2>
        {tours.length === 0 ? (
          <p style={{ color: "#888" }}>No tours found.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
            }}
          >
            {tours.map((tour) => (
              <div
                key={tour._id}
                style={{
                  width: 300,
                  background: "#fff",
                  borderRadius: 12,
                  padding: 15,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease",
                }}
              >
                <h3 style={{ margin: 0, color: "#2c3e50" }}>{tour.title}</h3>
                <p style={{ fontSize: 14, color: "#555" }}>
                  {tour.description?.slice(0, 80)}...
                </p>
                <p style={{ fontWeight: "bold", color: "#27ae60" }}>
                  ${tour.price}
                </p>

                {/* Tour Images */}
                {tour.images && tour.images.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      overflowX: "auto",
                      paddingBottom: 6,
                    }}
                  >
                    {tour.images.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5000${img}`}
                        alt={tour.title}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src="https://via.placeholder.com/70"
                    alt="No image"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <button
                    onClick={() => navigate(`/admin/edit/${tour._id}`)} // ✅ Fixed route
                    style={{
                      padding: "5px 10px",
                      background: "#3498db",
                      color: "#fff",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
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
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bookings Section */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={{ color: "#34495e" }}>
          {language === "en" ? "Bookings" : "ቦታ መያዣዎች"}
        </h2>
        {bookings.length === 0 ? (
          <p style={{ color: "#888" }}>No bookings yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#ecf0f1" }}>
                <tr>
                  <th style={{ padding: 10 }}>Tour</th>
                  <th style={{ padding: 10 }}>User</th>
                  <th style={{ padding: 10 }}>People</th>
                  <th style={{ padding: 10 }}>Date</th>
                  <th style={{ padding: 10 }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {b.tour?.title}
                    </td>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {b.user?.name}
                    </td>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {b.people}
                    </td>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {new Date(b.date).toLocaleDateString()}
                    </td>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      ${b.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Users Section */}
      <section>
        <h2 style={{ color: "#34495e" }}>
          {language === "en" ? "Users" : "ተጠቃሚዎች"}
        </h2>
        {users.length === 0 ? (
          <p style={{ color: "#888" }}>No users yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#ecf0f1" }}>
                <tr>
                  <th style={{ padding: 10 }}>Name</th>
                  <th style={{ padding: 10 }}>Email</th>
                  <th style={{ padding: 10 }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {u.name}
                    </td>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {u.email}
                    </td>
                    <td style={{ borderTop: "1px solid #ddd", padding: 10 }}>
                      {u.role}
                    </td>
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

export default AdminDashboard;
