const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/item");

//route Get: /api/items
//description  get all Item
// access Private
router.get("/", auth, (req, res) => {
  Item.find().then((data) => {
    res.json(data);
  });
});

//route post: /api/items
//description  create Item
// access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => {
    res.json(item);
  });
});

//route delete: /api/items/:id
//description  delete a item
// access Private
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

//export
module.exports = router;
