const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

//Database
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DATABASE_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

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
app.use(express.json());
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  //Index Page
  res.json({ message: "Welcome to ECOMM Backend." });
});
//Router
require("./app/routes/product.routes.js")(app);
require("./app/routes/cart.routes.js")(app);

//Frontend use 3000
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
