const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;

module.exports = mongoose;
