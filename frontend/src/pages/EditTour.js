// src/pages/EditTour.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTour({ language }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    duration: "",
    category: "",
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
      setTour({
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
        location: res.data.location,
        duration: res.data.duration,
        category: res.data.category,
      });
      setExistingImages(res.data.images || []);
    } catch (err) {
      console.error("Error fetching tour:", err);
      alert("❌ Failed to load tour data.");
    }
  };

  const handleChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", tour.title);
    formData.append("description", tour.description);
    formData.append("price", tour.price);
    formData.append("location", tour.location);
    formData.append("duration", tour.duration);
    formData.append("category", tour.category);

    newImages.forEach((img) => formData.append("images", img));

    try {
      await axios.put(`http://localhost:5000/api/tours/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Tour updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error updating tour:", err);
      alert("❌ Failed to update tour.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 25 }}>
          {language === "en" ? "✏️ Edit Tour" : "✏️ ጉብኝት ያስተካክሉ"}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label style={labelStyle}>
            {language === "en" ? "Title" : "ርዕስ"}
          </label>
          <input
            type="text"
            name="title"
            value={tour.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>
            {language === "en" ? "Description" : "መግለጫ"}
          </label>
          <textarea
            name="description"
            value={tour.description}
            onChange={handleChange}
            rows="4"
            style={{ ...inputStyle, resize: "none" }}
            required
          />

          <label style={labelStyle}>
            {language === "en" ? "Price ($)" : "ዋጋ ($)"}
          </label>
          <input
            type="number"
            name="price"
            value={tour.price}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>
            {language === "en" ? "Location" : "ቦታ"}
          </label>
          <input
            type="text"
            name="location"
            value={tour.location}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {language === "en" ? "Duration" : "ቆይታ"}
          </label>
          <input
            type="text"
            name="duration"
            value={tour.duration}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {language === "en" ? "Category" : "መደብ"}
          </label>
          <input
            type="text"
            name="category"
            value={tour.category}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {language === "en" ? "Existing Images" : "ነባር ምስሎች"}
          </label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            {existingImages.length > 0 ? (
              existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${img}`}
                  alt="tour"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                />
              ))
            ) : (
              <p style={{ color: "#999" }}>No images yet</p>
            )}
          </div>

          <label style={labelStyle}>
            {language === "en" ? "Upload New Images" : "አዲስ ምስሎች ያስገቡ"}
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={inputStyle}
          />

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              type="submit"
              style={{
                padding: "10px 25px",
                background: "linear-gradient(135deg, #2980b9, #3498db)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {language === "en" ? "Update Tour" : "ጉብኝት አዘምን"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin")}
              style={{
                marginLeft: 10,
                padding: "10px 25px",
                background: "#7f8c8d",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {language === "en" ? "Cancel" : "ሰርዝ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ Styles
const labelStyle = { display: "block", marginBottom: 6, marginTop: 15, color: "#2c3e50", fontWeight: "bold" };
const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
};

export default EditTour;
