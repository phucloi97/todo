const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const items = require("./routes/api/items");

//Bodyparser middleware
app.use(bodyParser.json());

//connect mongodb
const url = require("./config/key").mongoURL;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected database!");
  })
  .catch((err) => {
    console.log(err);
  });

//use Routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running :" + port);
});
