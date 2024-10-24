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

module.exports.renderNewListingForm = async (req, res) => {
  let club = await Clubs.findById(req.params.id);
  res.render("listings/newListing.ejs", {club});
};

module.exports.createClub = async (req, res) => {
  const newClub = new Clubs(req.body.club);
  const imageFile = req.files.find(file => file.fieldname === 'club[image]');
  const coordinatorFiles = req.files.filter(file => file.fieldname.startsWith('club[coordinators][') && file.fieldname.endsWith('][img]'));
  let url = imageFile.path;
  let fileName = imageFile.originalname;
  newClub.image = { url, fileName };
  newClub.coordinators = req.body.club.coordinators.map((coordinator, index) => {
    const file = coordinatorFiles.find(file => file.fieldname === `club[coordinators][${index}][img]`);
    if (file) {
      coordinator.img = {
        url: file.path,
        filename: file.originalname,
      };
    }
    return coordinator;
  });
  await newClub.save();
  req.flash("success", "New Club created!");
  res.redirect(`/clubs/${newClub._id}`);
};



module.exports.createListing = async (req, res) => {
  let club = await Clubs.findById(req.params.id);
  let url = req.file.path;
  let fileName = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, fileName };
  newListing.author = req.user._id;
  newListing.club = req.params.id;
  club.listings.push(newListing);
  await club.save();
  await newListing.save();
  req.flash("success", "New Club created!");
  res.redirect(`/clubs/${req.params.id}/listings`);
};

module.exports.renderNewClubEditForm = async (req, res) => {
    let { id } = req.params;
    const club = await Clubs.findById(id);
  res.render("clubs/editClub.ejs", {club});
}


module.exports.updateClub = async (req, res) => {
  let { id } = req.params;
  console.log("updating club...");

  try {
    const collection = await Clubs.findById(id);
    let coordinators = collection.coordinators;
    console.log(coordinators);

    let club = await Clubs.findByIdAndUpdate(id, { ...req.body.club }, { new: true });

    const imageFile = req.files.find(file => file.fieldname === 'club[image]');
    const coordinatorFiles = req.files.filter(file => file.fieldname.startsWith('club[coordinators][') && file.fieldname.endsWith('][img]'));

    if (imageFile) {
      let url = imageFile.path;
      let fileName = imageFile.originalname;
      club.image = { url, fileName };
    }

    coordinators = req.body.club.coordinators.map((coordinator, index) => {
      const file = coordinatorFiles.find(file => file.fieldname === `club[coordinators][${index}][img]`);
      if (file) {
        coordinator.img = {
          url: file.path,
          filename: file.originalname,
        };
      } else if (coordinators[index] && coordinators[index].img) {
        // Keep the old image if no new file is provided
        coordinator.img = coordinators[index].img;
      }
      return coordinator;
    });

    club.coordinators = coordinators;
    await club.save();

    console.log(club.coordinators);
    req.flash("success", "Club Updated!");
    res.redirect(`/clubs/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to update club.");
    res.redirect(`/clubs/${id}`);
  }
};



module.exports.showListing = async (req, res) => {
  const allListings = await Listing.find({ club: req.params.id });
  res.render("listings/showListing.ejs", { allListings });
};


module.exports.deleteClub = async (req, res) => {
  let { id } = req.params;
  let deletedClub = await Clubs.findByIdAndDelete(id);
  console.log(deletedClub);
  req.flash("success", "Club Deleted!");
  res.redirect("/clubs");
}