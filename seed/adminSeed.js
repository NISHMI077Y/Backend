// seed/adminSeed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB:", mongoose.connection.name);

    // Delete any existing admin user completely
    const deleted = await User.deleteMany({ username: "admin" });
    if (deleted.deletedCount > 0) {
      console.log(`Deleted ${deleted.deletedCount} old admin user(s)`);
    }

    // Create fresh admin with ALL required fields
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = await User.create({
      username: "admin",
      email: "admin@vehicle.com",
      password: hashedPassword,
      phone: "0000000000",
      role: "admin",
    });

    console.log("");
    console.log("================================");
    console.log("  Admin created successfully!");
    console.log(`  Username: ${admin.username}`);
    console.log(`  Email:    ${admin.email}`);
    console.log(`  Password: admin123`);
    console.log(`  Role:     ${admin.role}`);
    console.log(`  DB:       ${mongoose.connection.name}`);
    console.log("================================");
    console.log("");

    process.exit();
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

seedAdmin();