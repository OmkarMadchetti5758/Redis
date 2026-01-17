const redis = require("../config/redis");
const otpGenerator = require("../utils/otpGenerator");

const sendOtp = async (phone) => {
  const otp = otpGenerator();
  const key = `otp:${phone}`;

  await redis.set(key, otp, "EX", 300);
  return otp;
};

const verifyOtp = async (phone, otp) => {
  const key = `otp:${phone}`;
  const storedOtp = await redis.get(key);

  if (!storedOtp || storedOtp !== otp) {
    return false;
  }

  await redis.del(key);
  return true;
};

module.exports = { sendOtp, verifyOtp };
