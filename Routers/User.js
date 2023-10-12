const express = require("express")
const User = require("../Models/User");
const router = new express.Router();
const auth = require("../Middleware/auth");

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.login(username, password);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send({ 
      message: "Username or Password Incorrect"
    });
  }
});


router.post("/signup", async (req, res) => {
  const user = req.body;
  if(!user.username || !user.email || !user.password){
    return res.send({ message: "One or More Fields are Empty" });
  }
  await User.create(user);
  res.send({
    message: "Done"
  });
});


router.get("/users/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = await User.getById(id);
  if(!user) {
    return res.send({
      message: "User not Found!"
    })
  }
  res.send(user);
});

router.get("/users", async (req, res) => {
  const users = await User.getAll();
  res.send(users);
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.getById(id);
  if(!user) {
    return res.send({
      message: "User not Found!"
    })
  }
  await User.deletee(id);
  res.send("Deleted");
});

router.post("/users/guest", async (req, res) => {
  const user = await User.addGuest();
  res.send(user);
});

module.exports = router;
