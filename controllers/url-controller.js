const shortid = require("shortid");
const URL = require("../models/url-model");

async function handleUrlShortener(req, res) {
  const id = shortid();

  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  try {
    await URL.create({
      shortId: id,
      redirectURL: body.url,
      visitHistory: [],
    });
    console.log("Data created=", {
      shortId: id,
      redirectURL: body.url,
      visitHistory: [],
    });
  } catch (error) {
    console.log("Data not inserted in mongo | error:", error);
  }

  return res.json({ ID: id });
}

async function handleShowCollections(req, res) {
  if (req.query.admin === "ankit") {
    URL.find()
      .then((urls) => {
        res.json(urls);
      })
      .catch((error) => {
        console.log("Error while fetching documents | error:", error);
      });
  } else res.send("Not authorized");
}

async function handleShowAnalytics(req, res) {
  // console.log(req.params.shortId);
  const data = URL.findOne({ shortId: req.params.shortId });
  res.json({
    totalClicks: data.visitHistory.length,
    analytics: data.visitHistory,
  });
}
module.exports = {
  handleShowAnalytics,
  handleUrlShortener,
  handleShowCollections,
};
