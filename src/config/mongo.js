const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected");
  } catch (err) {
    console.error("Mongo connection failed", err.message);
    process.exit(1);
  }
};

module.exports = dbConnect
