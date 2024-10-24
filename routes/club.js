const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Clubs = require("../models/club");
const multer = require("multer");
const clubController = require("../Controllers/club");
const { ensureAuthenticated, validateClub, validateListing, isAdmin } = require("../middleware");
const { storage } = require("../cloudConfig.js");

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.fieldname.startsWith('club[coordinators][') && file.fieldname.endsWith('][img]')) {
        cb(null, true);
      } else if (file.fieldname === 'club[image]') {
        cb(null, true);
      } else {
        cb(new Error('Unexpected field'));
      }
    }
  });

router.route("/")
    .get(wrapAsync(clubController.index))
    .post(
        ensureAuthenticated,
        upload.any(),
        // validateClub,
        wrapAsync(clubController.createClub)
      );

router.get("/new", ensureAuthenticated, clubController.renderNewClubForm);

router.get("/:id/edit", ensureAuthenticated, clubController.renderNewClubEditForm)

router.route("/:id")
    .get(wrapAsync(clubController.showClub))
    .put(
        ensureAuthenticated,
        isAdmin,
        upload.any(),
        // validateClub,
        wrapAsync(clubController.updateClub))
    .delete(wrapAsync(clubController.deleteClub));

router.route("/:id/listings")
    .get(wrapAsync(clubController.showListing))
;

router
    .route("/:id/listings/new")
    .get(clubController.renderNewListingForm)
    .post(
        ensureAuthenticated,
        // upload.single("listing[image]"),
        // validateListing,
        wrapAsync(clubController.createListing)
);

module.exports = router

