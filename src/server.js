const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/mongo");
const authRoutes = require("./routes/auth.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

dbConnect();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening in PORT : ${PORT}`);
});
