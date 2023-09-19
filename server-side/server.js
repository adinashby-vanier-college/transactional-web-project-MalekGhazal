const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

// Middleware / Cross-Origin
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4200;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ECOMM Backend." });
});

require("./app/routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
