const data = require("../user.json");
const axios = require("axios");

const getConfig = (req, res) => {
  const pref = data.find((val) => val.email == user.email);
  if (pref) {
    return res.stutus(201).json(pref.pref);
  }
};

const config = (req, res) => {
  const { keyword, articlesPage, articlesCount } = req.body;
  const user = data.find((val) => val.email == user.email);

  if (keyword && keyword !== "") {
    user.pref.keyword = keyword;
  }

  if (articlesPage && articlesPage !== "") {
    user.pref.articlesPage = articlesPage;
  }

  if (articlesCount && articlesCount !== "") {
    user.pref.articlesCount = articlesCount;
  }

  const oldData = tasks.filter((val) => val.email === user.email);

  oldData.push(user);

  fs.writeFile("./user.json", JSON.stringify(oldData), (err) => {
    if (err) {
      return res.status(500).json({ msg: "Error Adding Files" });
    }
  });

  return res.status(201).json({ msg: "Data configuration has being Accepted" });
};

const news = (req, res) => {
  const user = data.find((val) => val.email == req.user.email);

  // axios
  //   .get("/http://eventregistry.org/api/v1/article/getArticles", {user.pref})
  //   .then((resp) => {
  //       return res.status(201).json(resp);

  //   })
  //   .catch(function (error) {
  //       return res.status(500).json(err);
  //   });
};

module.exports = {
  news,
  getConfig,
  config,
};
