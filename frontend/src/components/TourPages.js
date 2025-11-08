import React from "react";

function ToursPage({ tours, lang }) {
  return (
    <div>
      <h2>{lang === "en" ? "All Tours" : "ሁሉም ጉዞዎች"}</h2>
      {tours.length === 0 && <p>No tours yet.</p>}
      {tours.map((tour, index) => (
        <div key={index} style={{ marginBottom: 20, background: "#00000066", padding: 10 }}>
          {tour.image && <img src={tour.image} alt={tour.title} style={{ width: "200px" }} />}
          <h3>{tour.title}</h3>
          <p>{tour.description}</p>
          <p>{lang === "en" ? "Location" : "አካባቢ"}: {tour.location}</p>
          <p>{lang === "en" ? "Price" : "ዋጋ"}: ${tour.price}</p>
          <button>Book</button>
        </div>
      ))}
    </div>
  );
}

export default ToursPage;
