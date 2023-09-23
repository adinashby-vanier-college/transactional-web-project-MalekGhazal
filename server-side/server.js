const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

//Database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

var corsOptions = {
  origin: "http://localhost:3000",
};

// Middleware / Cross-Origin
app.use(cors(corsOptions));

//Index Page
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ECOMM Backend." });
});
//Router
require("./app/routes/product.routes.js")(app);

//Frontend use 3000
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
