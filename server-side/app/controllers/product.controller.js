const Product = require("../models/product.model.js");

exports.create = (req, res) => {
  const { _id, name, img, description, price, category, inStock } = req.body;

  const product = new Product({
    _id,
    name,
    img,
    description,
    price,
    category,
    inStock,
  });

  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.insertMany = (req, res) => {
  Product.find({}, "_id")
    .then((existingIds) => {
      // Convert the result to an array of _id values
      const existingIdSet = new Set(existingIds.map((doc) => doc._id));

      // Remove items from products data that exist in the database
      const uniqueProductsData = req.body.filter(
        (product) => !existingIdSet.has(product._id)
      );

      // Use insertMany with the remaining unique items
      return Product.insertMany(uniqueProductsData);
    })
    .then((savedProducts) => {
      console.log("Saved products:", savedProducts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.findAll = (req, res) => {
  Product.find()
    .sort({ _id: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: id })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: "No such product found" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const { _id, name, img, description, price, category, inStock } = req.body;

  const product = new Product({
    _id,
    name,
    img,
    description,
    price,
    category,
    inStock,
  });

  Product.findOneAndUpdate({ _id: id }, product, { new: true }) //new: true => return the modified document rather than the original. defaults to false
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete({ _id: id })
    .then((result) => {
      if (result) {
        res.send({ message: "Product deleted successfully" });
      } else {
        res.status(404).send({ message: "No product found to delete" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
