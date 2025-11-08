const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  
  // Change image field to an array for multiple images
  image: {
    type: [String], // now an array of image paths
    default: [],    // empty array by default
  },

  createdAt: { type: Date, default: Date.now },

  // New fields for reviews
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
