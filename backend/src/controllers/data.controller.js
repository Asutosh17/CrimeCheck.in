const express = require("express");
const Data = require("../model/data.model");

const router = express.Router();

router.get("", async (req, res) => {
    try {
      const data = await Data.find().lean().exec();
      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.post("", async (req, res) => {
    try {
      const data = await Data.create(req.body);
      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  module.exports = router


  // .populate({path:"username"})