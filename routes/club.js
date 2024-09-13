const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Clubs = require("../models/club");
const multer = require("multer");
const clubController = require("../Controllers/club");
const { ensureAuthenticated, validateClub } = require("../middleware");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(clubController.index))
    .post(
        ensureAuthenticated,
        upload.single('club[image]'),
        validateClub,
        wrapAsync(clubController.createClub)
    )

router.get("/new", ensureAuthenticated, clubController.renderNewForm);

router.route("/:id")
.get(wrapAsync(clubController.showClub))

module.exports = router

