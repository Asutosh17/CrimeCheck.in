const express = require("express");
const User = require("../model/register.model");

const router = express.Router();

router.get("", async (req, res) => {
    try {
      const login = await User.find().lean().exec();
      return res.status(200).send(login);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.post("", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (user) {
        if (password == user.password) {
          res.send({ message: "Login Successfull" , user: user });
        } else {
          res.send({ message: "Password didn't match" });
        }
      } else {
        res.send({message: "User not registered"});
      }
    });
  });
  
  module.exports = router;
  