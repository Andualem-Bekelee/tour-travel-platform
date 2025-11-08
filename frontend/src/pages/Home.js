// src/pages/Home.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ language }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const backgrounds = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  ];

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateText(false);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
        setAnimateText(true);
      }, 600);
    }, 12000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (aboutRef.current) {
        const top = aboutRef.current.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) setAboutVisible(true);
      }
      if (contactRef.current) {
        const top = contactRef.current.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) setContactVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        setTours(res.data);
      } catch (err) {
        console.error(err);
        alert(language === "en" ? "Unable to fetch tours." : "ጉብኝቶችን መጫን አልተቻለም።");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [language]);

  if (loading) return <p>Loading tours...</p>;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
      }}
    >
      {/* Background slideshow */}
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: `center ${scrollY * 0.2}px`,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: i === bgIndex ? 1 : 0,
            transform: i === bgIndex ? "scale(1.05)" : "scale(1)",
            transition: "opacity 2.5s ease-in-out, transform 12s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />

      {/* Social Media + Map (top-left) */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          zIndex: 5,
        }}
      >
        {/* Social Media Buttons */}
        {[
          { name: "Facebook", link: "https://facebook.com", color: "#1877F2" },
          { name: "Instagram", link: "https://instagram.com", color: "#E1306C" },
          { name: "WhatsApp", link: "https://wa.me/251900000000", color: "#25D366" },
          { name: "Telegram", link: "https://t.me/example", color: "#0088cc" },
          { name: "TikTok", link: "https://www.tiktok.com/@example", color: "#000" },
        ].map((item) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              borderRadius: "30px",
              background: item.color + "33",
              color: item.color,
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = item.color + "66";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = item.color + "33";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {item.name}
          </a>
        ))}

        {/* Map Preview */}
        <div
          style={{
            marginTop: 15,
            width: 270,
            height: 200,
            borderRadius: 15,
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
            transition: "transform 0.3s ease",
          }}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/place/Addis+Ababa,+Ethiopia",
              "_blank"
            )
          }
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126094.8302877417!2d38.65689676432781!3d9.019146632322832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b849f2bda8e3f%3A0x85d3a1f9e17b4b7e!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1687787115143!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: "none" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          zIndex: 3,
          position: "relative",
          textAlign: "center",
          paddingTop: "180px",
          transition: "opacity 1.5s ease, transform 1.5s ease",
          opacity: animateText ? 1 : 0,
          transform: animateText ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            textShadow: "3px 3px 14px rgba(0,0,0,0.8)",
            marginBottom: "15px",
          }}
        >
          Explore Ethiopia & Beyond
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "750px",
            margin: "0 auto 25px",
            lineHeight: "1.8",
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          From misty mountains to golden deserts, dive into breathtaking journeys
          that blend nature, culture, and adventure.
        </p>
        <Link
          to="/tours"
          style={{
            backgroundColor: "#ff7b00",
            color: "white",
            padding: "12px 32px",
            borderRadius: "30px",
            fontSize: "1.15rem",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Start Exploring
        </Link>
      </div>

      {/* Tours Grid */}
      <div
        style={{
          zIndex: 3,
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 30,
          padding: "50px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {tours.map(
          (tour) =>
            tour.image &&
            tour.image.length > 0 &&
            tour.image.slice(0, 2).map((img, idx) => (
              <div
                key={`${tour._id}-${idx}`}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  padding: 10,
                  backdropFilter: "blur(4px)",
                  transition: "transform 0.3s",
                }}
              >
                <img
                  src={`http://localhost:5000${img}`}
                  alt={tour.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                  }}
                  onClick={() => setZoomImage(`http://localhost:5000${img}`)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h4 style={{ marginTop: "10px", color: "#fff", textAlign: "center" }}>
                  {tour.title}
                </h4>
              </div>
            ))
        )}
      </div>

      {/* Hero Section */}
<div
  style={{
    zIndex: 3,
    position: "relative",
    textAlign: "center",
    paddingTop: "180px",
    transition: "opacity 1.5s ease, transform 1.5s ease",
    opacity: animateText ? 1 : 0,
    transform: animateText ? "translateY(0)" : "translateY(20px)",
  }}
>
  <h1
    style={{
      fontSize: "3.5rem",
      fontWeight: "bold",
      textShadow: "3px 3px 14px rgba(0,0,0,0.8)",
      marginBottom: "15px",
    }}
  >
    Explore Ethiopia & Beyond
  </h1>
  <p
    style={{
      fontSize: "1.25rem",
      maxWidth: "750px",
      margin: "0 auto 25px",
      lineHeight: "1.8",
      textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
    }}
  >
    From misty mountains to golden deserts, dive into breathtaking journeys
    that blend nature, culture, and adventure.
  </p>
  <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px" }}>
    <Link
      to="/tours"
      style={{
        backgroundColor: "#ff7b00",
        color: "white",
        padding: "12px 32px",
        borderRadius: "30px",
        fontSize: "1.15rem",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Start Exploring
    </Link>

    {/* Book Now Button (under each tour image) */}
<Link
  to="/tours"
  style={{
    display: "block",
    textAlign: "center",
    marginTop: "10px",
    backgroundColor: "#00b894",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "all 0.3s",
  }}
  onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
  onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
>
  Book Now
</Link>

  </div>
</div>


      {/* About Section */}
      <div
        ref={aboutRef}
        style={{
          background: "rgba(0,0,0,0.7)",
          padding: "60px 20px",
          textAlign: "center",
          color: "white",
          opacity: aboutVisible ? 1 : 0,
          transform: aboutVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          marginTop: "30px",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: 20 }}>About Us</h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "1.1rem",
            lineHeight: "1.7",
          }}
        >
          We are a passionate travel company dedicated to showcasing the beauty
          of Ethiopia and beyond. From historic wonders to natural landscapes,
          our goal is to create unforgettable travel experiences for adventurers,
          families, and explorers alike.
        </p>
      </div>

      {/* Contact Section */}
      <div
        ref={contactRef}
        style={{
          background: "rgba(0,0,0,0.85)",
          padding: "60px 20px",
          textAlign: "center",
          color: "white",
          opacity: contactVisible ? 1 : 0,
          transform: contactVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          marginTop: "30px",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: 20 }}>Contact Us</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: 10 }}>
          📧 Email: <a href="mailto:info@travel.com" style={{ color: "#ff7b00", fontWeight: "bold" }}>info@travel.com</a>
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: 10 }}>
          📞 Phone: <a href="tel:+251913943958" style={{ color: "#ff7b00", fontWeight: "bold" }}>+251 913943958</a>
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: 30 }}>
          📍 Address: <a href="https://goo.gl/maps/5kpV5v9qV3k9mZ9N8" target="_blank" rel="noopener noreferrer" style={{ color: "#ff7b00", fontWeight: "bold" }}>Addis Ababa, Ethiopia</a>
        </p>

        <form style={{ marginTop: 30, maxWidth: 600, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column", gap: 15 }}>
          <input type="text" name="name" placeholder="Your Name" required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s",
              backgroundColor: "transparent"
            }}
            onFocus={(e) => { e.currentTarget.style.border = "2px solid #ff7b00"; e.currentTarget.style.boxShadow = "0 0 10px rgba(255,123,0,0.4)"; }}
            onBlur={(e) => { e.currentTarget.style.border = "1px solid #ccc"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <input type="email" name="email" placeholder="Your Email" required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s",
              backgroundColor: "transparent"
            }}
            onFocus={(e) => { e.currentTarget.style.border = "2px solid #ff7b00"; e.currentTarget.style.boxShadow = "0 0 10px rgba(255,123,0,0.4)"; }}
            onBlur={(e) => { e.currentTarget.style.border = "1px solid #ccc"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <textarea name="message" rows="5" placeholder="Your Message" required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              resize: "vertical",
              transition: "all 0.3s",
              backgroundColor: "transparent"
            }}
            onFocus={(e) => { e.currentTarget.style.border = "2px solid #ff7b00"; e.currentTarget.style.boxShadow = "0 0 10px rgba(255,123,0,0.4)"; }}
            onBlur={(e) => { e.currentTarget.style.border = "1px solid #ccc"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <button type="submit"
            style={{
              padding: "12px 25px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#ff7b00",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Zoom Modal */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={zoomImage}
            alt="Zoom"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
