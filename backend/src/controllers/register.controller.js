const express = require('express')
const User = require('../model/register.model')
const { body, validationResult } = require('express-validator');
const router = express.Router()




// register get
router.get("", async (req, res) => {
    try {
      const register = await User.find().lean().exec();
      return res.status(200).send(register);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  })
  


// register post
router.post("", 

  body("username","Invalid Username").notEmpty().custom((value) => {
   let flag1 = false
   let flag2 = false
    const arr = value.trim().split("").map(Number)
   for(let i=0; i<arr.length; i++){
    if(isNaN(arr[i])) flag1 = true 
    else flag2 = true
   }
    if(flag1 && flag2 ) return true
}),
  body("password","Invalid Password").notEmpty().isStrongPassword(),
 (req, res) => {
    const err = validationResult(req)
    if(!err.isEmpty()) return res.status(400).send({Error : err.array()})
    const { username, password} = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (user) {
        res.send({ message: "User already registered" });
      }else{
        const user = new User({
          username,
          password
        });
        user.save((err) => {
          if (err) {
            res.send({message:"error"});
          } else {
            res.send({ message: "Successfully Registered" });
          }
        });
      }
    });
});

module.exports = router