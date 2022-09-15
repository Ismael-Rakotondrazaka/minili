const { Router } = require("express");
const { reverse, minify } = require("../../../../controllers");
const router = Router();

router.post("/", minify);

router.get("/:link", reverse);

module.exports = router;