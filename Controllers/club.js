const Clubs = require("../models/club");

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
  res.render("clubs/show.ejs", { club });
};

module.exports.renderNewForm = (req, res) => {
    res.render("clubs/new.ejs")
}

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