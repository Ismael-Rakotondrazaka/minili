const mongoose = require("../services/mongoose");

const linkSchema = new mongoose.Schema({
  short: String,
  long: String,
  createdAt: Date,
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
