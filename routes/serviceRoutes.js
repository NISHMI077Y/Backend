const express = require("express");
const router = express.Router();
const {
  getAllServices,
  createService,
  deleteService,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

router.get("/", getAllServices);
router.post("/", protect, adminOnly, createService);
router.delete("/:id", protect, adminOnly, deleteService);

module.exports = router;