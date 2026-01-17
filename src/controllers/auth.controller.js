const User = require("../models/User.model");
const { sendOtp, verifyOtp } = require("../services/otp.service");

const sendOtpController = async (req, res) => {
  const phone = req.body.phone;

  const otp = await sendOtp(phone);

  res.status(201).json({ message: "OTP sent: ", otp });
};

const verifyOtpController = async (req, res) => {
  const { otp, phone } = req.body;

  const isValid = await verifyOtp(phone, otp);

  if (!isValid) {
    return res.status(301).json({ message: "Invalid or Expired OTP" });
  }

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone, isVerified: true });
  } else {
    user.isVerified = true;
    await user.save();
  }

  res.json({ message: "OTP verified successfully", user });
};

module.exports = { sendOtpController, verifyOtpController };
