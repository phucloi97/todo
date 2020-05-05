const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check token
  if (!token) {
    res.status(401).json({ message: "no token, auth denied" });
  }
  try {
    //verity token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "token is not invalid" });
  }
}

module.exports = auth;
