const Clubs = require("../models/club");
const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allClubs = await Clubs.find({});
    res.render("clubs/index.ejs", {allClubs});
}

module.exports.showClub = async (req, res) => {
  let { id } = req.params;
  const club = await Clubs.findById(id)
  if (!club) {
    req.flash("error", "Club you requested for does not exist!");
    res.redirect("/Clubs");
  }
  res.render("clubs/showClubs.ejs", { club });
};

module.exports.renderNewClubForm = (req, res) => {
    res.render("clubs/newClub.ejs")
}

module.exports.renderNewListingForm = (req, res) => {
  res.render("clubs/newListing.ejs");
};

module.exports.createClub = async (req, res) => {
    let url = req.file.path;
    let fileName = req.file.filename;
    const newClub = new Clubs(req.body.club);
    newClub.coordinators.push(req.user._id);
    newClub.image = { url, fileName };
    await newClub.save();
    req.flash("success", "New Club created!");
    res.redirect("/clubs");
}

module.exports.createListing = async (req, res) => {
  let club = await Clubs.findById(req.params.id);
  let url = req.file.path;
  let fileName = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, fileName };
  newListing.author = req.user._id;
  newListing.club = req.params.id;
  club.listings.push(newListing);
  await newListing.save();
  req.flash("success", "New Club created!");
  res.redirect(`/clubs/${req.params.id}/listings`);
};

module.exports.showListing = async (req, res) => {
    const allListings = await Listing.find({ club: req.params.id });
  res.render("clubs/showListing.ejs", { allListings });
}