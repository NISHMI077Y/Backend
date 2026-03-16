const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number is required"],
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);