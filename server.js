const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const items = require("./routes/api/items");

//Bodyparser middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "client", "build")));
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

app.get("*", (req, res) => {
  res.sendFile("./index.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running :" + port);
});
