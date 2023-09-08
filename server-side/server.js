const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware / Cross-Origin
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
