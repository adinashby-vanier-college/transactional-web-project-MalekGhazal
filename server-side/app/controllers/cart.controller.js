const Cart = require("../models/cart.model.js");

exports.create = (req, res) => {
  const { _id, name, brand, price, category } = req.body;

  const cart = new Cart({
    _id,
    name,
    brand,
    price,
    category,
  });

  cart
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.findAll = (req, res) => {
  Cart.find()
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
  Cart.findOne({ _id: id })
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

  const cart = new Cart({
    name,
    brand,
    price,
    category,
  });

  Cart.findOneAndUpdate({ _id: id }, cart, { new: true }) //new: true => return the modified document rather than the original. defaults to false
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Cart.findOneAndDelete({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteAll = (req, res) => {
  Cart.deleteMany({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
