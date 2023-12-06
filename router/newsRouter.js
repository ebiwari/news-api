const { Router } = require("express");
const { news, getConfig, config } = require("../controller/newsController");
const router = Router();

router.get("/news", news);

router.get("/preferences", getConfig);

router.put("/preferences", config);

module.exports = router;
