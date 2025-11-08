const Booking = require("../models/booking");
const Tour = require("../models/Tour");

exports.createBooking = async (req, res) => {
  try {
    const { tourId, date, numberOfPeople } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const totalPrice = tour.price * numberOfPeople;

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      date,
      numberOfPeople,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("tour");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
