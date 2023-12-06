const data = require("../user.json");
const axios = require("axios");
const fs = require("fs");

const getConfig = (req, res) => {
  const { user } = req;
  const pref = data.find((val) => val.email == user.email);
  if (pref) {
    return res.status(201).json(pref.pref);
  }

  return res.status(201).json({ msg: "No user exist" });
};

const config = (req, res) => {
  const { keyword, articlesPage, articlesCount } = req.body;
  const { user } = req;
  const userPref = data.find((val) => val.email == user.email);

  if (keyword && keyword !== "") {
    userPref.pref.keyword = keyword;
  }

  if (articlesPage && articlesPage !== "") {
    userPref.pref.articlesPage = articlesPage;
  }

  if (articlesCount && articlesCount !== "") {
    userPref.pref.articlesCount = articlesCount;
  }

  const oldData = data.filter((val) => val.email !== user.email);

  oldData.push(userPref);

  fs.writeFile("./user.json", JSON.stringify(oldData), (err) => {
    if (err) {
      return res.status(500).json({ msg: "Error Adding Files" });
    }
  });

  return res.status(201).json({ msg: "Data configuration has being Accepted" });
};

const news = (req, res) => {
  const { user } = req;
  const userPref = data.find((val) => val.email == req.user.email);

  if (!userPref) {
    return res.status(401).json({ msg: "User is not found" });
  }

  axios
    .get("/http://eventregistry.org/api/v1/article/getArticles", {
      params: userPref.pref,
    })
    .then((resp) => {
      return res.status(201).json(resp);
    })
    .catch(function (err) {
      return res.status(500).json(err);
    });
};

module.exports = {
  news,
  getConfig,
  config,
};
