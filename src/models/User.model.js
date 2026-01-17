const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, unique: true, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
