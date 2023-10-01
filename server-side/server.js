const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const _dirman = path.dirname("");
const buildPath = path.join(_dirman, "../ecomm-project/build");

app.use(express.static(buildPath));

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../ecomm-project/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

var corsOptions = {
  origin: "http://localhost:3000",
};

// Middleware / Cross-Origin
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4200;

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to ECOMM Backend." });
});

require("./app/routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
