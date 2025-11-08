const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images (so frontend can display them)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🌍 Tour & Travel API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
