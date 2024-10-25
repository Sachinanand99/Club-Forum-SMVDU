const Listing = require("../models/listing");
const Clubs = require("../models/club");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}


module.exports.createListing = async (req, res) => {
    let club = await Clubs.findById(req.params.id);
    const newListing = new Listing(req.body.listing);
    if (typeof req.file !== "undefined"){
        let url = req.file.path;
        let fileName = req.file.filename;
        newListing.image = { url, fileName };
    }
    newListing.author = req.user._id;
    newListing.club = req.params.id;
    club.listings.push(newListing);
    await club.save();
    await newListing.save();
    req.flash("success", "New Club created!");
    res.redirect(`/clubs/${req.params.id}/listings`);
  };
  
  
  module.exports.showListings = async (req, res) => {
    let {id} = req.params; 
    const allListings = await Listing.find({ club: req.params.id });
    res.render("listings/showListings.ejs", { allListings, id });
  };
  
  module.exports.renderNewListingForm = async (req, res) => {
    let club = await Clubs.findById(req.params.id);
    res.render("listings/newListing.ejs", {club});
  };

  module.exports.renderEditListingForm = async (req, res)=>{
    let {id, id2} = req.params;
    let listing = await Listing.findById(id2);    
    let club = await Clubs.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect(`/clubs/${id}/lisitings`);
      }
      let originalImageUrl;
      if (listing.image.url){
          originalImageUrl = listing.image.url;
          originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300"); 
      }
    res.render("listings/editListing.ejs", {listing, club, originalImageUrl});
  }


  module.exports.viewListing = async(req, res)=>{
    let {id2} = req.params;
    let listing = await Listing.findById(id2);    
    res.render("listings/viewListing.ejs", {listing, id2});
  }

  module.exports.handleUpdateListing = async (req, res)=>{
    let {id, id2} = req.params;
    let listing = await Listing.findByIdAndUpdate(id2, { ...req.body.listing }, { new: true });
    if(typeof req.file !== "undefined"){  
        let url = req.file.path;
        let fileName = req.file.filename;
        listing.image = {url, fileName};
        await listing.save();
        }
        req.flash("success", "Post updated!");
        res.redirect(`/clubs/${id}/listings/${id2}`);
};

module.exports.handleDeleteListing = async (req, res)=>{
    let {id, id2} = req.params;
    await Listing.findByIdAndDelete(id2);
    req.flash("success", "Post Deleted!");
    res.redirect(`/clubs/${id}/listings/`);
}