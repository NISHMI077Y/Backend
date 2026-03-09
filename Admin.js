const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists ✅");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    await User.create({
      username: "admin",
      password: hashedPassword
    });

    console.log("✅ Default admin created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");

    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();