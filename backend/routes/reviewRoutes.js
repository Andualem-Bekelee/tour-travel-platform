const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Tour = require("../models/Tour");

// Add a review
router.post("/:tourId", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const tourId = req.params.tourId;

    const review = new Review({ tour: tourId, user, rating, comment });
    await review.save();

    // Optional: update average rating in Tour
    const reviews = await Review.find({ tour: tourId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Tour.findByIdAndUpdate(tourId, { averageRating: avg });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Failed to add review" });
  }
});

// Get reviews for a tour
router.get("/:tourId", async (req, res) => {
  try {
    const reviews = await Review.find({ tour: req.params.tourId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
