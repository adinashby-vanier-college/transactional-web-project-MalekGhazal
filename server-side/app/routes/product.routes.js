module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new products
  router.post("/", products.create);

  // Retrieve all products
  router.get("/", products.findAll);

  // Retrieve a single products with id
  router.get("/:id", products.findOne);

  // Update a products with id
  router.put("/:id", products.update);

  // Delete a products with id
  router.delete("/:id", products.delete);

  // Delete all products
  router.delete("/", products.deleteAll);

  app.use("/product", router);
};
