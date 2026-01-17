const express = require("express");
const {
  sendOtpController,
  verifyOtpController,
} = require("../controllers/auth.controller");
const rateLimiter = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/send-otp", rateLimiter, sendOtpController);
router.post("/verify-otp", verifyOtpController);

module.exports = router;
