const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getDashboardStats,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly, userOnly } = require("../middleware/roleMiddleware");

router.post("/", protect, userOnly, createBooking);
router.get("/my-bookings", protect, userOnly, getMyBookings);

router.get("/stats/dashboard", protect, adminOnly, getDashboardStats);
router.get("/", protect, adminOnly, getAllBookings);
router.get("/:id", protect, adminOnly, getBookingById);
router.put("/:id/status", protect, adminOnly, updateBookingStatus);
router.delete("/:id", protect, adminOnly, deleteBooking);

module.exports = router;