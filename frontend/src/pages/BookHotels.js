// src/pages/BookHotels.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function BookHotels({ language }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hotels");
        setHotels(res.data);
      } catch (err) {
        alert(language === "en" ? "Unable to fetch hotels." : "ሆቴሎችን መጫን አልተቻለም።");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [language]);

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      (hotel.location && hotel.location.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotel || !selectedRoom) return;

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/hotel-bookings", {
        ...formData,
        hotelId: selectedHotel._id,
        roomId: selectedRoom._id,
      });
      alert(language === "en" ? "Booking successful!" : "መያዣዎ ተሳክቷል።");
      setFormData({ name: "", email: "", checkIn: "", checkOut: "" });
      setSelectedRoom(null);
      setSelectedHotel(null);
    } catch (err) {
      console.error(err);
      alert(language === "en" ? "Booking failed." : "መያዣው አልተሳካም።");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p style={{ padding: 20 }}>{language === "en" ? "Loading hotels..." : "ሆቴሎች በመጫን ላይ..."}</p>;

  if (hotels.length === 0)
    return <p style={{ padding: 20 }}>{language === "en" ? "No hotels available." : "አሁን ሆቴሎች የሉም።"}</p>;

  return (
    <div style={{ padding: 20, minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {language === "en" ? "Available Hotels" : "የሚገኙ ሆቴሎች"}
      </h2>

      <input
        type="text"
        placeholder={language === "en" ? "Search hotels..." : "ሆቴሎች ይፈልጉ..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 30,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {filteredHotels.map((hotel) => (
          <div
            key={hotel._id}
            onClick={() => setSelectedHotel(hotel)}
            style={{
              width: 300,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <div style={{ height: 180, overflow: "hidden" }}>
              <img
                src={hotel.image ? `http://localhost:5000${hotel.image}` : "https://via.placeholder.com/300x180"}
                alt={hotel.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 15 }}>
              <h3 style={{ margin: "0 0 5px" }}>{hotel.name}</h3>
              {hotel.location && <p style={{ margin: "0 0 10px", color: "#555" }}>{hotel.location}</p>}
              
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Rooms & Booking Form */}
      {selectedHotel && (
        <div
          onClick={() => { setSelectedHotel(null); setSelectedRoom(null); }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflowY: "auto",
            padding: 20,
            cursor: "zoom-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 800,
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              position: "relative",
              padding: 20,
            }}
          >
            <h2>{selectedHotel.name}</h2>

            {selectedHotel.rooms && selectedHotel.rooms.length > 0 ? (
              selectedHotel.rooms.map((room) => (
                <div key={room._id} style={{ marginBottom: 15, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
                  <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                    <img
                      src={room.image ? `http://localhost:5000${room.image}` : "https://via.placeholder.com/60"}
                      alt={room.name}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                    />
                    <div>
                      <p style={{ margin: 0 }}>{room.name}</p>
                      <p style={{ fontWeight: "bold", margin: 0 }}>${room.price}</p>
                    </div>
                    <button
                      onClick={() => setSelectedRoom(room)}
                      style={{
                        padding: "8px 15px",
                        background: "teal",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      {language === "en" ? "Book Room" : "ክፍል ይይዙ"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>{language === "en" ? "No rooms available." : "ክፍሎች የሉም።"}</p>
            )}

            {/* Booking Form */}
            {selectedRoom && (
              <form onSubmit={handleFormSubmit} style={{ marginTop: 20 }}>
                <h3>
                  {language === "en" ? `Booking for: ${selectedRoom.name}` : `መያዣ ለ: ${selectedRoom.name}`}
                </h3>

                <input
                  type="text"
                  placeholder={language === "en" ? "Your Name" : "ስምዎ"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />

                <input
                  type="email"
                  placeholder={language === "en" ? "Your Email" : "ኢሜልዎ"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />

                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    required
                    style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                  />
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    required
                    style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: 10,
                    background: submitting ? "#ccc" : "green",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  {submitting
                    ? language === "en" ? "Booking..." : "በመስራት ላይ..."
                    : language === "en" ? "Confirm Booking" : "መያዣን ያረጋግጡ"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookHotels;
