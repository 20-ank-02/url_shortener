const mongo = require("mongoose");
mongo.set("strictQuery", true);

async function connectMongo(url) {
  return mongo.connect(url);
}

module.exports = { connectMongo };
