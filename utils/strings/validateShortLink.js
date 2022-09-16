const { BadRequestError, ServerError } = require("../errors");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

function validateShortLink(link) {
  let hostDomain = process.env.APP_HOST;
  if (!hostDomain) {
    throw new ServerError(
      `Invalid environnement variable:\nAPP_HOST=${process.env.APP_HOST}`,
      false
    );
  }

  let linkDomain;
  const linkSeparated = link.split("/");

  if (linkSeparated.length === 4) {
    linkDomain = linkSeparated[2];
  } else if (linkSeparated.length === 2) {
    linkDomain = linkSeparated[1];
  }

  if (!linkDomain || linkDomain !== hostDomain) {
    throw new BadRequestError(`The link ${link} is broken.`);
  }

  return true;
}

module.exports = validateShortLink;
