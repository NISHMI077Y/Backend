const router = require("express").Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  updateStatus,
  deleteBooking
} = require("../controllers/bookingController");

const auth = require("../middleware/authMiddleware");

router.post("/", createBooking);
router.get("/", auth, getBookings);
router.get("/:id", auth, getBookingById);
router.put("/:id/status", auth, updateStatus);
router.delete("/:id", auth, deleteBooking);

module.exports = router;