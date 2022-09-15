const path = require("path");

const { NotFoundError } = require("./utils/errors");
const { StatusCodes } = require("http-status-codes");

const express = require("express");
const app = express();

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/v1/process"));

app.use("/api/v1/links", require("./routes/v1/api/links"));

app.use("/api/*", (req, res, next) => {
  next(new NotFoundError());
});

app.use("/pages", require("./routes/v1/pages"));

app.all("*", function (req, res, next) {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send(
      createNotFoundPageResponse(`${process.env.APP_URL}${req.originalUrl}`)
    );
});

const { errorMiddleware } = require("./middlewares");
const { createNotFoundPageResponse } = require("./utils/responses");
app.use(errorMiddleware);

const PORT = process.env.APP_PORT || 8001;
app.listen(PORT, (req, res) => {
  console.log("listening on port ", PORT);
});
