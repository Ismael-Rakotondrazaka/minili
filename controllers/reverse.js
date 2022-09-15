const { createDataResponse } = require("../utils/responses");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { Link } = require("../models");
const { BadRequestError } = require("../utils/errors");
const linkResource = require("../resources/linkResource");

async function reverse(req, res, next) {
  try {
    const { link } = req.params;

    const short = `/${link}`;

    let targetLink = await Link.findOne({
      short,
    });

    if (!targetLink) {
      throw new BadRequestError(
        `The link ${process.env.APP_URL}${short} is broken.`
      );
    }

    const response = linkResource(targetLink);
    response.short = `${process.env.APP_URL}${short}`;

    return res.json(createDataResponse(response));
  } catch (error) {
    next(error);
  }
}

module.exports = reverse;
