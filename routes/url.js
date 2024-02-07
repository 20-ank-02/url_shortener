const express = require("express");
const { handleUrlShortener } = require("../controllers/url-controller");

const router = express.Router();

router.post("/", handleUrlShortener);

module.exports = router;
