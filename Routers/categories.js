const express = require("express");
const Category = require("../Models/Category");
const router = new express.Router();

router.post("/categories", async (req, res) => {
  const category = req.body;
  await Category.create(category);
  res.send("Created");
});

router.get("/categories", async (req, res) => {
  const categories = await Category.getAll();
  res.send(categories);
});
router.get("/categories/:id", async (req, res) => {
  const id = req.params.id;
  const category = await Category.getByID(id);
  res.send(category);
});
router.delete("/categories/:id", async (req, res) => {
  const id = req.params.id;
  await Category.deleteById(id);
  res.send("Deleted");
});
module.exports = router;
