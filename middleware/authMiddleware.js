const jwt = require("jsonwebtoken");

const SALT = "EbiwariWilliams" || process.env.SALT;

const auth = (req, res, next) => {
  const token = req.header && req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Invalid Token" });
  }

  try {
    const verifyToken = jwt.verify(token, SALT);
    req.user = verifyToken;

    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = auth;
