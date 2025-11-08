const Tour = require("../models/Tour");

// CREATE a new tour
async function createTour(req, res) {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// READ all tours
async function getTours(req, res) {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// READ one tour
async function getTourById(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE tour
async function updateTour(req, res) {
  try {
    const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Tour not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE tour
async function deleteTour(req, res) {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Export functions individually
module.exports = {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
};
