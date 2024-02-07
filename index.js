const express = require("express");
const urlRoute = require("./routes/url");
const connectMongo = require("./connect");
const URL = require("./models/url-model");
const app = express();
const PORT = 8000;

app.use(express.json());

connectMongo("mongodb://Localhost:27017/url-shortener")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  console.log(req.params.shortId);
  const entryUrl = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: Date.now() } }
  );
});

app.listen(PORT, () => console.log("listening on", PORT));
