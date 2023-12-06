const fs = require("fs");
const bcrypt = require("bcrypt");
const data = require("../user.json");
const jwt = require("jsonwebtoken");
const Validate = require("../utils/validate");

require("dotenv").config();

const SALT = "EbiwariWilliams" || process.env.SALT;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    return res.status(401).json({ msg: "All field are required" });
  }

  if (Validate.emailExist(email)) {
    return res.status(401).json({ msg: "Email has already being Used" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    data.push({
      name,
      email,
      password: hash,
      pref: {
        action: "getArticles",
        keyword: "Barack Obama",
        articlesPage: 1,
        articlesCount: 100,
        articlesSortBy: "date",
        articlesSortByAsc: false,
        articlesArticleBodyLen: -1,
        resultType: "articles",
        dataType: ["news", "pr"],
        apiKey: "dfe96205-1ce7-4183-af73-26b8553a1256",
        forceMaxDataTimeWindow: 31,
      },
    });

    fs.writeFile("./user.json", JSON.stringify(data), (err) => {
      if (err) {
        return res.status(500).json({ msg: "Error Adding Files" });
      }
    });

    return res.status(201).json({ msg: "You have register successful" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(401).json({ msg: "All field are required" });
  }

  const user = data.find((val) => val.email === email);

  if (!user) {
    return res.status(401).json({ msg: "User does not Exist" });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Wrong Password Sent" });
    }
    const token = await jwt.sign({ email: user.email }, SALT);

    req.user = { email: email };

    return res.set("auth-token", token).status(201).json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
};
