import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    arrivalDate: "",
    people: 1,
    totalPrice: 0,
    specialRequests: "",
  });

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, text: "" });

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
      setTour(res.data);
    } catch (err) {
      console.error("Failed to load tour:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "people" && tour) {
      setFormData((prev) => ({
        ...prev,
        totalPrice: value * tour.price,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        tourId: id,
        ...formData,
      });
      alert("✅ Booking successful!");
      navigate("/bookings");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("❌ Failed to create booking.");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return alert("Please fill all fields!");
    setReviews([...reviews, reviewForm]);
    setReviewForm({ name: "", rating: 5, text: "" });
  };

  if (!tour) return <p>Loading tour details...</p>;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #a0e9ff, #f8faff)",
        overflow: "hidden",
        paddingTop: "50px",
      }}
    >
      {/* Animated Clouds and Plane */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="plane"
          style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
            fontSize: "2rem",
            animation: "fly 18s linear infinite",
          }}
        >
          ✈️
        </div>
        <div
          className="cloud"
          style={{
            position: "absolute",
            top: "30%",
            left: "0",
            fontSize: "3rem",
            animation: "cloud 25s linear infinite",
          }}
        >
          ☁️
        </div>
        <div
          className="cloud"
          style={{
            position: "absolute",
            top: "60%",
            left: "20%",
            fontSize: "4rem",
            animation: "cloud 30s linear infinite",
          }}
        >
          ☁️
        </div>
      </div>

      {/* Booking Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "white",
          borderRadius: 20,
          maxWidth: 420,
          margin: "auto",
          padding: 30,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#007b7f", marginBottom: 10 }}>
          Book Tour: {tour.title}
        </h2>
        <p style={{ textAlign: "center", marginBottom: 20 }}>
          💰 Price per person: <b>${tour.price}</b>
        </p>

        {/* Leaflet Map */}
        {tour.latitude && tour.longitude && (
          <div style={{ height: "300px", marginBottom: 20 }}>
            <MapContainer
              center={[tour.latitude, tour.longitude]}
              zoom={13}
              style={{ height: "100%", width: "100%", borderRadius: 12 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[tour.latitude, tour.longitude]}>
                <Popup>{tour.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />

          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} />

          <label>Phone:</label>
          <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />

          <label>Arrival Date:</label>
          <input
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>People:</label>
          <input
            type="number"
            name="people"
            min="1"
            value={formData.people}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <p>
            <b>Total Price:</b> ${formData.totalPrice}
          </p>

          <label>Special Requests:</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            style={{ ...inputStyle, height: 70 }}
          />

          <button type="submit" style={buttonStyle}>
            Confirm Booking
          </button>
        </form>

        {/* Reviews Section */}
        <div style={{ marginTop: 40 }}>
          <h3 style={{ textAlign: "center", color: "#007b7f" }}>⭐ Reviews</h3>
          {reviews.length === 0 ? (
            <p style={{ textAlign: "center" }}>No reviews yet.</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} style={reviewBox}>
                <b>{r.name}</b> - {r.rating}⭐
                <p>{r.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Review Form */}
        <div style={{ marginTop: 30 }}>
          <h4>Submit a Review</h4>
          <form onSubmit={handleReviewSubmit}>
            <input
              placeholder="Your Name"
              name="name"
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              style={inputStyle}
            />
            <select
              name="rating"
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
              style={inputStyle}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>
            <textarea
              placeholder="Write your review..."
              name="text"
              value={reviewForm.text}
              onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
              style={{ ...inputStyle, height: 80 }}
            />
            <button type="submit" style={buttonStyle}>
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fly {
            0% { left: -10%; top: 20%; transform: rotate(0deg); }
            50% { left: 60%; top: 15%; transform: rotate(10deg); }
            100% { left: 110%; top: 10%; transform: rotate(0deg); }
          }
          @keyframes cloud {
            0% { left: -20%; }
            100% { left: 120%; }
          }
        `}
      </style>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  border: "none",
  borderRadius: 8,
  background: "teal",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: 5,
  transition: "0.3s",
};

const reviewBox = {
  background: "#f9f9f9",
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
  boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
};

export default BookingForm;
