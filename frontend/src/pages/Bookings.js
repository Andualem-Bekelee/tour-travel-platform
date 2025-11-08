// src/pages/Bookings.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        alert("❌ Unable to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      alert("✅ Booking deleted successfully!");
    } catch (err) {
      console.error("Failed to delete booking:", err);
      alert("❌ Failed to delete booking.");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading bookings...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Tour</th>
              <th>Arrival</th>
              <th>People</th>
              <th>Total Price</th>
              <th>Special Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.email || "-"}</td>
                <td>{b.phone || "-"}</td>
                <td>{b.tourId?.title || "-"}</td>
                <td>{new Date(b.arrivalDate).toLocaleDateString()}</td>
                <td>{b.people}</td>
                <td>${b.totalPrice}</td>
                <td>{b.specialRequests || "-"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(b._id)}
                    style={{
                      padding: "5px 10px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
