// src/pages/About.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home({ language }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    arrivalDate: "",
    people: 1,
  });

  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = `?destination=${formData.destination}&date=${formData.arrivalDate}&people=${formData.people}`;
    navigate("/tours" + query);
  };

  // Fade-in when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === contactRef.current) setContactVisible(entry.isIntersecting);
          if (entry.target === aboutRef.current) setAboutVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) observer.observe(contactRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  // Smooth scroll functions
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        paddingTop: 60,
        paddingBottom: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Scroll Buttons */}
      <div
        style={{
          position: "absolute",
          top: 20,
          display: "flex",
          gap: 10,
          zIndex: 2,
        }}
      >
        <button
          onClick={scrollToAbout}
          style={{
            padding: "8px 15px",
            borderRadius: 5,
            border: "none",
            cursor: "pointer",
            backgroundColor: "teal",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {language === "en" ? "About Us" : "ስለ እኛ"}
        </button>
        <button
          onClick={scrollToContact}
          style={{
            padding: "8px 15px",
            borderRadius: 5,
            border: "none",
            cursor: "pointer",
            backgroundColor: "teal",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {language === "en" ? "Contact" : "አግኙን"}
        </button>
      </div>

      {/* Centered Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          color: "#222",
        }}
      >
        {/* Contact Section */}
        <div
          ref={contactRef}
          style={{
            width: "100%",
            padding: 20,
            backgroundColor: "#e0f7fa",
            borderRadius: 12,
            border: "1px solid #00bcd4",
            textAlign: "center",
            opacity: contactVisible ? 1 : 0,
            transform: contactVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.8s ease",
          }}
        >
          <h3 style={{ margin: 0, color: "#00796b" }}>
            {language === "en" ? "Contact Us" : "አግኙን"}
          </h3>
          <p style={{ color: "#00796b", fontWeight: "bold" }}>📞 +123 456 7890</p>
          <p style={{ color: "#00796b", fontWeight: "bold" }}>✉️ info@tourtravel.com</p>
        </div>

        {/* Search & Booking Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            padding: "25px 30px",
            borderRadius: 12,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        >
          <h1 style={{ marginBottom: 15 }}>
            {language === "en" ? "Plan Your Dream Trip" : "ሕልምዎን የሚያሳክሉ ጉዞዎችን ይዘጋጁ"}
          </h1>
          <p style={{ marginBottom: 20, color: "#555" }}>
            {language === "en"
              ? "Search and book your next adventure in just a few clicks!"
              : "ጉዞዎን በጥቂት ጫነት ይፈልጉ እና ይይዙ።"}
          </p>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="destination"
              placeholder={language === "en" ? "Destination" : "መድረሻ"}
              value={formData.destination}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                margin: "8px 0",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                margin: "8px 0",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
            <input
              type="number"
              name="people"
              min="1"
              value={formData.people}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                margin: "8px 0",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 0",
                marginTop: 10,
                backgroundColor: "teal",
                color: "white",
                fontSize: 16,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "0.3s",
              }}
            >
              {language === "en" ? "Search Tours" : "ጉብኝቶችን ይፈልጉ"}
            </button>
          </form>
        </div>

        {/* About Us Section */}
        <div
          ref={aboutRef}
          style={{
            background: "rgba(255,255,255,0.95)",
            padding: 25,
            borderRadius: 12,
            width: "100%",
            maxWidth: 700,
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.8s ease",
          }}
        >
          <h2>{language === "en" ? "About Us" : "ስለ እኛ"}</h2>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            {language === "en"
              ? "Welcome to our Tour & Travel Platform! We provide unique travel experiences, guided tours, and hassle-free booking to help you explore the world. Whether you want a relaxing getaway or an adventurous journey, we are here to make your travel dreams come true."
              : "ወደ ጉብኝት እና ትራቭል ፕላትፎርም እንኳን በደህና መጡ! እኛ ልዩ ጉዞ ልምዶችን፣ መሪ ጉብኝቶችን እና ቀላል የሆነ ቦኪንግን እንሰጣለን። ዕረፍት ወይም የፈለጉትን ጉዞ በማድረግ፣ እኛ የጉዞዎን ሕልም እንከናወናለን።"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
