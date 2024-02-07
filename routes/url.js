const express = require("express");
const {
  handleUrlShortener,
  handleShowCollections,
  handleShowAnalytics,
} = require("../controllers/url-controller");

const router = express.Router();

router.post("/", handleUrlShortener);

router.get("/show", handleShowCollections);

router.get("/analytics/:shortId", handleShowAnalytics);

module.exports = router;
