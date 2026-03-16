// seed/cleanup.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const cleanup = async () => {
  try {
    // Clean old "test" database
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("Connected to 'test' database");
    await mongoose.connection.dropDatabase();
    console.log("Dropped 'test' database (old data removed)");
    await mongoose.disconnect();

    // Connect to correct database
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`\nConnected to '${mongoose.connection.name}' database`);
    console.log("This is your correct database");

    process.exit();
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

cleanup();