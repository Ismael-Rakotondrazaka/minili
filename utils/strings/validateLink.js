const { BadRequestError } = require("../errors");

function validateLink(link) {
  const URL_REGEX =
    /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%-._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

  if (URL_REGEX.test(link)) {
    return true;
  } else {
    throw new BadRequestError("Please, provide a valid link.");
  }
}

module.exports = validateLink;
