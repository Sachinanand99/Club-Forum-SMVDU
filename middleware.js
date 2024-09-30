const { clubSchema, listingSchema } = require("./schema.js")
const express = require("express");
const ExpressError = require("./utils/ExpressError.js")

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
