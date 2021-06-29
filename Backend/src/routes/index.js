var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("School Finder Web App");
});

module.exports = router;
