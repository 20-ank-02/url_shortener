const shortid = require("shortid");
const URL = require("../models/url-model");

async function handleUrlShortener(req, res) {
  const id = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  await URL.create({
    shortId: id,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ ID: id });
}

module.exports = { handleUrlShortener };
