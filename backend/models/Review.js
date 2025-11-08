const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  user: { type: String, required: true }, // Could use userId if you have auth
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
