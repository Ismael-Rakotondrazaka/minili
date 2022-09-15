const { createDataResponse } = require("../utils/responses");
const nanoidConfig = require("../configs/nanoidConfig.json");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { Link } = require("../models");
const { BadRequestError } = require("../utils/errors");
const linkResource = require("../resources/linkResource");
const { validateLink, isShortLink } = require("../utils/strings");

async function minify(req, res, next) {
  try {
    const { link } = req.body;

    if (!link) {
      throw new BadRequestError("link is required.");
    }

    validateLink(link);

    if (isShortLink(link)) {
      throw new BadRequestError("The link is already minified.");
    }

    let short;
    let targetLink = await Link.findOne({
      long: link,
    });

    if (!targetLink) {
      const nanoidLib = await import("nanoid");
      const { nanoid } = nanoidLib;

      do {
        short = nanoid(nanoidConfig.DEFAULT_LENGTH);
      } while (
        await Link.findOne({
          short,
        })
      );

      const linkParams = {
        short: `/${short}`,
        long: link,
        createdAt: new Date(),
      };

      targetLink = new Link(linkParams);
      targetLink.save((err) => {
        if (err) {
          next(err);
        }
      });
    }

    const response = linkResource(targetLink);
    response.short = `${process.env.APP_URL}${response.short}`;

    return res.json(createDataResponse(response));
  } catch (error) {
    next(error);
  }
}

module.exports = minify;
