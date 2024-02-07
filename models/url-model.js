const mongo = require("mongoose");

const schema = new mongo.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: Number }],
  },
  { timeStamp: true }
);

const URL = mongo.model("url", schema);

module.exports = URL;
