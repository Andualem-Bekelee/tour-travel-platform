// src/pages/Tours.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faTwitter,
  faTelegramPlane,
  faTiktok
} from "@fortawesome/free-brands-svg-icons";

function Tours({ language, isAdmin }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [zoomTour, setZoomTour] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        const toursData = res.data;

        const toursWithRatings = await Promise.all(
          toursData.map(async (tour) => {
            try {
              const reviewsRes = await axios.get(`http://localhost:5000/api/reviews/${tour._id}`);
              const reviews = reviewsRes.data;
              const avgRating =
                reviews.length > 0
                  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                  : 0;
              return {
                ...tour,
                avgRating: avgRating.toFixed(1),
                reviewCount: reviews.length,
              };
            } catch {
              return { ...tour, avgRating: 0, reviewCount: 0 };
            }
          })
        );

        setTours(toursWithRatings);
      } catch (err) {
        alert(language === "en" ? "Unable to fetch tours." : "ጉብኝቶችን መጫን አልተቻለም።");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [language]);

  const filteredTours = tours.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (halfStar) stars.push("☆");
    while (stars.length < 5) stars.push("☆");
    return stars.join(" ");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      setTours(tours.filter((t) => t._id !== id));
      alert("Tour deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete tour.");
    }
  };

  if (loading)
    return (
      <p style={{ padding: 20, fontFamily: "'Georgia', serif" }}>
        {language === "en" ? "Loading tours..." : "ጉብኝቶች በመጫን ላይ..."}
      </p>
    );

  if (tours.length === 0)
    return (
      <p style={{ padding: 20, fontFamily: "'Georgia', serif" }}>
        {language === "en" ? "No tours available." : "አሁን ጉብኝቶች የሉም።"}
      </p>
    );

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        backgroundImage: "url('/mountain.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        fontFamily: "'Georgia', serif",
        color: "#333",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Top Social Media */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 15 }}>
          <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2", fontSize: 22 }}><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C", fontSize: 22 }}><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://wa.me/251900000000" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontSize: 22 }}><FontAwesomeIcon icon={faWhatsapp} /></a>
          <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2", fontSize: 22 }}><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://t.me/example" target="_blank" rel="noopener noreferrer" style={{ color: "#0088cc", fontSize: 22 }}><FontAwesomeIcon icon={faTelegramPlane} /></a>
          <a href="https://www.tiktok.com/@example" target="_blank" rel="noopener noreferrer" style={{ color: "#000", fontSize: 22 }}><FontAwesomeIcon icon={faTiktok} /></a>
        </div>

        {/* Title */}
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#fff", fontSize: "2.5rem", letterSpacing: 1, textTransform: "uppercase", textShadow: "2px 2px 10px rgba(0,0,0,0.7)" }}>
          {language === "en" ? "Available Tours" : "የሚገኙ ጉብኝቶች"}
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder={language === "en" ? "Search tours..." : "ጉብኝቶች ይፈልጉ..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: 12, marginBottom: 30, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
        />

        {/* Tours Grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center" }}>
          {filteredTours.map((tour) => (
            <div key={tour._id} style={{ position: "relative", width: 320, borderRadius: 15, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.25)", cursor: "pointer" }} className="tour-card">
              <div style={{ position: "relative", height: 200 }}>
                <img
                  src={tour.image && tour.image.length > 0 ? `http://localhost:5000${tour.image[0]}` : "https://via.placeholder.com/320x200"}
                  alt={tour.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onClick={() => setZoomTour(tour)}
                />
              </div>

              {/* Info */}
              <div style={{ padding: "12px", background: "#fff" }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>{tour.title}</h3>
                <p style={{ margin: "5px 0", color: "#555", fontSize: 14, minHeight: 50 }}>{tour.description.slice(0, 80)}...</p>
                <p style={{ color: "#f39c12", fontSize: 14 }}>{renderStars(tour.avgRating)} ({tour.reviewCount})</p>
                <p style={{ fontWeight: "bold" }}>${tour.price}</p>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, padding: "12px", background: "#fff" }}>
                <Link to={`/book/${tour._id}`} style={{ flex: 1 }}>
                  <button style={{ background: "linear-gradient(135deg, #27ae60, #2ecc71)", color: "#fff", border: "none", padding: "10px 0", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>
                    {language === "en" ? "Book Now" : "ይይዙ"}
                  </button>
                </Link>
                {isAdmin && <>
                  <Link to={`/admin/edit/${tour._id}`} style={{ flex: 1 }}>
                    <button style={{ background: "orange", color: "#fff", border: "none", padding: "10px 0", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(tour._id)} style={{ flex: 1, background: "red", color: "#fff", border: "none", padding: "10px 0", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>Delete</button>
                </>}
              </div>
            </div>
          ))}
        </div>

        {/* Zoom / Details Modal with Gallery */}
        {zoomTour && (
          <div
            onClick={() => setZoomTour(null)}
            style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, overflowY: "auto", padding: 20, cursor: "zoom-out" }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 12, maxWidth: 800, width: "100%", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", position: "relative" }}>
              <ImageGallery images={zoomTour.image} />

              {/* Tour Details */}
              <div style={{ padding: 20 }}>
                <h2 style={{ marginTop: 0 }}>{zoomTour.title}</h2>
                <p>{zoomTour.description}</p>
                <p style={{ color: "#f39c12" }}>{renderStars(zoomTour.avgRating)} ({zoomTour.reviewCount} reviews)</p>
                <p style={{ fontWeight: "bold" }}>Price: ${zoomTour.price}</p>
                {zoomTour.duration && <p>Duration: {zoomTour.duration}</p>}
                {zoomTour.category && <p>Category: {zoomTour.category}</p>}
                <Link to={`/book/${zoomTour._id}`}>
                  <button style={{ background: "#27ae60", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>
                    {language === "en" ? "Book Now" : "ይይዙ"}
                  </button>
                </Link>
                {zoomTour.location && (
                  <div style={{ marginTop: 20 }}>
                    <iframe
                      title="Tour Location"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(zoomTour.location)}&output=embed`}
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: 10 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .tour-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.35); }
        .tour-card img:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}

// ImageGallery Component
function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return <img src="https://via.placeholder.com/800x400" alt="placeholder" style={{ width: "100%", objectFit: "cover", maxHeight: 400 }} />;

  const prev = (e) => { e.stopPropagation(); setCurrent(current === 0 ? images.length - 1 : current - 1); };
  const next = (e) => { e.stopPropagation(); setCurrent(current === images.length - 1 ? 0 : current + 1); };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <img src={`http://localhost:5000${images[current]}`} alt={`Tour ${current+1}`} style={{ width: "100%", objectFit: "cover", maxHeight: 400 }} />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button onClick={prev} style={arrowStyle("left")}>&lt;</button>
          <button onClick={next} style={arrowStyle("right")}>&gt;</button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 10, overflowX: "auto" }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000${img}`}
              alt={`thumb ${idx+1}`}
              onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
              style={{
                width: 60,
                height: 40,
                objectFit: "cover",
                border: idx === current ? "2px solid #27ae60" : "1px solid #ccc",
                borderRadius: 4,
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: 10,
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 35,
  height: 35,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default Tours;
