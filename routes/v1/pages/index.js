const { Router } = require("express");
const router = Router();

const { aboutPage } = require("../../../controllers");

router.get("/about", aboutPage);

module.exports = router;
