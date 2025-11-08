const express = require("express");
const router = express.Router();
const Tour = require("../models/Tour");
const multer = require("multer");
const path = require("path");

// Multer config for multiple images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single tour
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create tour (multiple images)
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];
    const tourData = {
      ...req.body,
      image: images, // save multiple images
    };
    const tour = await Tour.create(tourData);
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update tour (multiple images)
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];
    const tourData = {
      ...req.body,
    };
    if (images.length > 0) tourData.image = images;

    const tour = await Tour.findByIdAndUpdate(req.params.id, tourData, { new: true });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete tour
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
