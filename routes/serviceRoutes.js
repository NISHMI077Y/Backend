const router = require("express").Router();
const { getServices, createService } = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

router.get("/", getServices);
router.post("/", auth, createService);

module.exports = router;