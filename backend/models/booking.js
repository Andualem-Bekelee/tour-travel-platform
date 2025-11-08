const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  arrivalDate: { type: Date, required: true },
  people: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  specialRequests: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
