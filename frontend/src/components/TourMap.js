// src/components/TourMap.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function TourMap({ lat, lng, title }) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[lat, lng]}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default TourMap;
