const redis = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  const phone = req.body.phone;
  const key = `rate:${phone}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 60); // 1 min
  }

  if (count > 5) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next()
};

module.exports = rateLimiter
