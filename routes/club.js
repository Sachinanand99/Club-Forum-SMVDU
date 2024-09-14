const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Clubs = require("../models/club");
const multer = require("multer");
const clubController = require("../Controllers/club");
const { ensureAuthenticated, validateClub, validateListing } = require("../middleware");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(clubController.index))
    .post(
        ensureAuthenticated,
        upload.single('club[image]'),
        // validateClub,
        wrapAsync(clubController.createClub)
    )

router.get("/new", ensureAuthenticated, clubController.renderNewClubForm);

router.route("/:id")
.get(wrapAsync(clubController.showClub))

router.route("/:id/listings")
    .get(wrapAsync(clubController.showListing))
    .post(
    ensureAuthenticated,
    upload.single("listing[image]"),
    // validateListing,
    wrapAsync(clubController.createListing),
);

router.get(
    "/:id/listings/new",
    clubController.renderNewListingForm
)
module.exports = router

