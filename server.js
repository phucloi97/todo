const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "client", "build")));

//connect mongodb
const url = config.get("mongoURL");
mongoose
  .connect(url, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("connected database!");
  })
  .catch((err) => {
    console.log(err);
  });

//use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/*", (req, res) => {
  res.sendFile("/index.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running :" + port);
});
