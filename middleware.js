const { clubSchema, listingSchema, commentSchema } = require("./schema.js")
const express = require("express");
const ExpressError = require("./utils/ExpressError.js")
const Club = require("./models/club.js");

const getAdminEmails = async (clubId) => {
  try {
    const club = await Club.findById(clubId);
    if (!club) {
      throw new ExpressError(400, "Club not found");
    }

    const adminEmails = club.admins.map((admin) => admin.email).join(", ");
    return adminEmails;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in to create new Club.");
  req.session.redirectUrl = req.originalUrl;
  return res.redirect("/auth");
};

module.exports.validateClub = (req, res, next) => {
  let { error } = clubSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new ExpressError(400, error);
  }
  next();
};

module.exports.validateComment = (req, res, next) => {
   let { error } = commentSchema.validate(req.body);
   console.log(error);
   if (error) {
     throw new ExpressError(400, error);
   }
   next();
}

module.exports.isAdmin = async (req, res, next) => {
  console.log("isadmin function ran");
  let clubId = req.params.id;
  let clubAdmins = await getAdminEmails(clubId);
  if (process.env.ADMIN_LIST) {
    if (process.env.ADMIN_LIST.includes(res.locals.currUser.email) || clubAdmins.includes(res.locals.currUser.email)) {
      next();
    } else {
      throw new ExpressError(403, "Access Denied!");
    }
  } else {
    if (clubAdmins.includes(res.locals.currUser.email)) {
      next();
    } else {
      throw new ExpressError(403, "Access Denied!");
    }
  }
}

module.exports.isSuperAdmin = (req, res, next) => {
  console.log("isSuperAdmin function ran");
  if (process.env.ADMIN_LIST) {
    if (
      process.env.ADMIN_LIST.includes(res.locals.currUser.email) 
    ) {
      next();
    } else {
      throw new ExpressError(403, "Access Denied!");
    }
  }
  else {
      throw new ExpressError(403, "Access Denied!");
  }
}