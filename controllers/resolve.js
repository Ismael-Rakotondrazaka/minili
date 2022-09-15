const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { Link } = require("../models");
const createNotFoundPageResponse = require("../utils/responses/createNotFoundPageResponse");
const { StatusCodes } = require("http-status-codes");

async function resolve(req, res, next) {
  try {
    const { link } = req.params;

    const short = `/${link}`;

    let targetLink = await Link.findOne({
      short,
    });

    if (!targetLink) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(createNotFoundPageResponse(`${process.env.APP_URL}/${link}`));
    }

    return res.redirect(targetLink.long);
  } catch (error) {
    next(error);
  }
}

module.exports = resolve;
