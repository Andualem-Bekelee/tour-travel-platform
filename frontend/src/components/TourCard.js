// src/components/TourCard.js
import React from "react";

const TourCard = ({ tour, onZoom }) => {
  return (
    <div
      className="w-64 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={() => onZoom(tour.image && tour.image[0] ? `http://localhost:5000${tour.image[0]}` : "https://via.placeholder.com/250")}
    >
      <img
        src={tour.image && tour.image.length > 0 ? `http://localhost:5000${tour.image[0]}` : "https://via.placeholder.com/250"}
        alt={tour.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800">{tour.title}</h3>
        <p className="text-gray-600 mt-1">{tour.destination}</p>
        <p className="text-blue-600 font-semibold mt-2">${tour.price}</p>
      </div>
    </div>
  );
};

export default TourCard;
