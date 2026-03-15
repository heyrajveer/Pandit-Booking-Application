const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createPandit,
  getPandits
} = require("../controllers/panditController");

router.post(
  "/create",
  verifyToken,
  roleMiddleware("pandit"),
  createPandit
);

router.get("/", getPandits);

module.exports = router;