const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const salt = bcrypt.genSaltSync(10);

//Item Model
const User = require("../../models/User");

//route post: /api/auth
//description  login
// access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  User.findOne({ email }).then((user) => {
    if (!user) {
      console.log(user);
      return res.status(400).json({ massage: "user does not exist!" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ massage: "Invalid password" });
      }
      jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
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

//route  Get api/auth/user
//description get user data
//access  private
router.get("/user", auth, (req, res) => {
  User.findOne(req.user._id)
    .select("-password")
    .then((user) => res.json(user));
});

//export
module.exports = router;
