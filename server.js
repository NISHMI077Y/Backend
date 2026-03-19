const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173",
    "https://frontend-two-dun-fin49x3kv1.vercel.app"
  ], 
  credentials: true,
}));
app.use(express.json());

// Debug: Log every request hitting the backend
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Vehicle Service Booking API Running" });
});

// 404 handler — catch unmatched routes
app.use((req, res) => {
  console.log(`404 NOT FOUND: ${req.method} ${req.url}`);
  res.status(404).json({ 
    message: `Route not found: ${req.method} ${req.url}` 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});