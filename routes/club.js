const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Clubs = require("../models/club");
const multer = require("multer");
const clubController = require("../Controllers/club");
const listingController = require("../Controllers/listing");
const { ensureAuthenticated, validateClub, validateListing, isAdmin } = require("../middleware");
const { storage } = require("../cloudConfig.js");

const uploadClubImg = multer({
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

const uploadListingImg = multer({storage: storage});


router.route("/")
    .get(wrapAsync(clubController.index))
    .post(
        ensureAuthenticated,
        uploadClubImg.any(),
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
        uploadClubImg.any(),
        // validateClub,
        wrapAsync(clubController.updateClub))
    .delete(wrapAsync(clubController.deleteClub));

router.route("/:id/listings")
    .get(wrapAsync(listingController.showListings));
;

router
    .route("/:id/listings/new")
    .get(listingController.renderNewListingForm)
    .post(
      ensureAuthenticated,
      isAdmin,
      uploadListingImg.single("listing[image]"),
      // validateListing,
      wrapAsync(listingController.createListing)
);


router.route("/:id/listings/:id2/edit")
.get(ensureAuthenticated, isAdmin, wrapAsync(listingController.renderEditListingForm))
.put(ensureAuthenticated,
  isAdmin,
  uploadListingImg.single("listing[image]"),
  wrapAsync(listingController.handleUpdateListing))
;

router.route("/:id/listings/:id2/")
.get(wrapAsync(listingController.viewListing))
.delete(ensureAuthenticated,
  isAdmin,
  wrapAsync(listingController.handleDeleteListing)
);

module.exports = router