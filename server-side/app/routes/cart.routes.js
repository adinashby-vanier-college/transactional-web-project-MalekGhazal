module.exports = (app) => {
  const carts = require("../controllers/cart.controller.js");

  var router = require("express").Router();

  // Create a new carts
  router.post("/", carts.create);

  // Retrieve all carts
  router.get("/", carts.findAll);

  // Retrieve a single carts with id
  router.get("/:id", carts.findOne);

  // Update a carts with id
  router.put("/:id", carts.update);

  // Delete a carts with id
  router.delete("/:id", carts.delete);

  // Delete all carts
  router.delete("/", carts.deleteAll);

  app.use("/cart", router);
};
