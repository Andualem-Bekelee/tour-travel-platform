const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Tour = require("../models/Tour");

// Create a booking
router.post("/", async (req, res) => {
  try {
    const { tourId, name, email, phone, arrivalDate, people, totalPrice, specialRequests } = req.body;

    if (!tourId || !name || !arrivalDate || !people || !totalPrice) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found." });

    const booking = new Booking({ tourId, name, email, phone, arrivalDate, people, totalPrice, specialRequests });
    const savedBooking = await booking.save();

    await savedBooking.populate("tourId", "title price");

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("tourId", "title price");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    await booking.remove();
    res.json({ message: "Booking deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
