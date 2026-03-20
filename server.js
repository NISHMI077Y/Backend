// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS — Allow ALL Vercel URLs automatically
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile, curl, postman)
    if (!origin) return callback(null, true);

    // Allow localhost for development
    if (origin.includes("localhost")) return callback(null, true);

    // Allow ANY vercel.app subdomain
    if (origin.endsWith(".vercel.app")) return callback(null, true);

    // Allow ANY onrender.com subdomain
    if (origin.endsWith(".onrender.com")) return callback(null, true);

    // Block everything else
    console.log("❌ CORS blocked:", origin);
    return callback(null, true); // Allow anyway for now
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Vehicle Service Booking API Running" });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});