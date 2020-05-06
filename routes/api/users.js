const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const salt = bcrypt.genSaltSync(10);

//Item Model
const User = require("../../models/User");

//route post: /api/User
//description  Register new user
// access Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name + email + password);
  //validate
  if (!name || !email) {
    res.status(400).json({ message: "please enter all feilds" });
  }
  //check for existing user
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    var hashPassword = bcrypt.hashSync(newUser.password, salt); //ma hoa password
    newUser.password = hashPassword;
    newUser.save().then((user) => {
      jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          //tao toke
          if (err) {
            throw err;
          }
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//export
module.exports = router;
