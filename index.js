// function mainApp() {
const express = require("express");
const urlRoute = require("./routes/url");
const { connectMongo } = require("./connect");
const URL = require("./models/url-model");
const app = express();
const PORT = 8000;

app.use(express.json());
app.set("view engine", "ejs");
connectMongo("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Could not connect to mongo", err));

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  // console.log(req.params.shortId);
  try {
    const data = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      { $push: { visitHistory: { timeStamp: Date.now() } } }
    );
    // res.json({ "redirect-url": data["redirectURL"] });
    res.redirect(`https://${data.redirectURL}`);
  } catch (error) {
    console.log("An error occured while redirecting | error-message:", error);
  }
});

app.listen(PORT, () => console.log("listening on", PORT));
// }

// module.exports = mainApp;
