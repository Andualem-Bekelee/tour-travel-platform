import React, { useState } from "react";
import axios from "axios";

function AddTour({ language }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || images.length === 0) {
      alert(language === "en" ? "❌ Please fill all fields!" : "❌ እባክዎ ሁሉንም መስኮች ይሙሉ!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post("http://localhost:5000/api/tours", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(language === "en" ? "✅ Tour added successfully!" : "✅ ጉብኝቱ ተጠናቋል!");
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert(language === "en" ? "❌ Failed to add tour." : "❌ ጉብኝቱ ማክሰኞ አልተቻለም።");
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: 30,
        borderRadius: 12,
        color: "#fff",
        backgroundImage: "url('/dashboard-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: 20,
          borderRadius: 12,
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {language === "en" ? "Add New Tour" : "አዲስ ጉብኝት ያክሉ"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder={language === "en" ? "Title" : "ርዕስ"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginBottom: 10, padding: 10, borderRadius: 6, border: "none" }}
          />
          <textarea
            placeholder={language === "en" ? "Description" : "መግለጫ"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ marginBottom: 10, padding: 10, borderRadius: 6, border: "none" }}
          />
          <input
            type="number"
            placeholder={language === "en" ? "Price" : "ዋጋ"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ marginBottom: 10, padding: 10, borderRadius: 6, border: "none" }}
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
            style={{ marginBottom: 10 }}
          />
          <button
            type="submit"
            style={{
              padding: 12,
              background: "linear-gradient(to right, #f7971e, #ffd200)",
              color: "#222",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {language === "en" ? "Add Tour" : "ጉብኝት ያክሉ"}
          </button>
        </form>

        {/* Preview selected images */}
        {images.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h4>{language === "en" ? "Selected Images:" : "ተመረጡ ምስሎች:"}</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 6 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTour;
