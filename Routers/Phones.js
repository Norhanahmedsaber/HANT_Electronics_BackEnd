const express = require("express");
const Phone = require("../Models/phone.js");
const router = new express.Router();

module.exports = router;

router.get("/phones/:id", async (req, res) => {
  const id = req.params.id;
  const phones = await Phone.Get(id);
  res.send(phones);
});

router.delete("/phones/:id", async (req, res) => {
  const id = req.params.id;
  await Phone.Delete(id);
  res.send("Deleted");
});

router.post("/phones/:id", async (req, res) => {
  const store_id = req.params.id;
  const phone = req.body;
  await Phone.Create(phone, store_id);
  res.send("Created");
});
