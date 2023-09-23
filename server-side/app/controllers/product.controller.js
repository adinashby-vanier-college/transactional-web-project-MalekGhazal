const Product = require("../models/product.model.js");

exports.create = (req, res) => {
  const { _id, name, brand, price, category } = req.body;

  const product = new Product({
    _id,
    name,
    brand,
    price,
    category,
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
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const { name, brand, price, category } = req.body;
  console.log(name);

  const product = new Product({
    name,
    brand,
    price,
    category,
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
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
