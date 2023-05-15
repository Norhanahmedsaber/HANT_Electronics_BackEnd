const express = require("express");
const Store = require("../Models/Store.js");
const router = new express.Router();

router.get("/stores", async (req, res) => {
  const stores = await Store.GetAll();
  res.send(stores);
});

router.get("/stores/:id", async (req, res) => {
  const id = req.params.id;
  const store = await Store.Get(id);
  res.send(store);
});

router.delete("/stores/:id", async (req, res) => {
  const id = req.params.id;
  await Store.Delete(id);
  res.send("Deleted");
});

router.delete("/stores", async (req, res) => {
  await Store.DeleteAll();
  res.send("Deleted");
});

router.put("/stores/:id", async (req, res) => {
  const id = req.params.id;
  const store = req.body;
  await Store.Update(store, id);
  res.send("Updated");
});

router.post("/stores", async (req, res) => {
  const store = req.body;
  await Store.Create(store);
  res.send("Created");
});

module.exports = router;
