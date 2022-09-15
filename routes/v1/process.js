const { Router } = require("express");
const { resolve, homePage } = require("../../controllers");
const router = Router();

router.get("/", homePage);
router.get("/:link", resolve);

module.exports = router;
