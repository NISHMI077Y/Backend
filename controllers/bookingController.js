const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const {
    customerName,
    phone,
    vehicleNumber,
    serviceType,
    date,
    time,
  } = req.body;

  try {
    const booking = await Booking.create({
      user: req.user._id,
      customerName,
      phone,
      vehicleNumber,
      serviceType,
      date,
      time,
      status: "Pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const { status, date } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (date) filter.date = date;

    const bookings = await Booking.find(filter)
      .populate("user", "username email phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.id
    ).populate("user", "username email phone");

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch booking",
      error: err.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = [
    "Pending",
    "Approved",
    "Completed",
    "Rejected",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Must be: ${validStatuses.join(", ")}`,
    });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found" });
    }

    res.json({
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update status",
      error: err.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete booking",
      error: err.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const pending = await Booking.countDocuments({
      status: "Pending",
    });
    const approved = await Booking.countDocuments({
      status: "Approved",
    });
    const completed = await Booking.countDocuments({
      status: "Completed",
    });
    const rejected = await Booking.countDocuments({
      status: "Rejected",
    });

    const today = new Date().toISOString().split("T")[0];
    const todayBookings = await Booking.countDocuments({
      date: today,
    });

    res.json({
      total,
      pending,
      approved,
      completed,
      rejected,
      todayBookings,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get stats",
      error: err.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getDashboardStats,
};