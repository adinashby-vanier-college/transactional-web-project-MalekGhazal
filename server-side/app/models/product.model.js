const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    //product id
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
