const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    //product id
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
