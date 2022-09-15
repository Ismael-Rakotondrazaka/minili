const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") })

function isShortLink(link) {
  // should get https://domain.com
  let hostDomain = process.env.APP_HOST.split("//")[1];
  if (!hostDomain) {
    return false;
  }

  let linkDomain;
  const linkSeparated = link.split("/");

  if (linkSeparated.length === 4) {
    linkDomain = linkSeparated[2];
  } else if (linkSeparated.length === 2) {
    linkDomain = linkSeparated[1];
  }

  if (!linkDomain || linkDomain !== hostDomain) {
    return false;
  }

  return true;
}

module.exports = isShortLink;
