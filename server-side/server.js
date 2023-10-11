const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();

// Middleware / Cross-Origin
app.use(bodyParser.json());
app.use(cors());

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

app.post("/create-checkout-session", async (req, res) => {
  const cart = req.body.cart;

  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancelled",
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Router
app.get("/api/", (req, res) => {
  res.send("Hello World!");
});
require("./app/routes/product.routes.js")(app);

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

//Frontend use 3000
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
