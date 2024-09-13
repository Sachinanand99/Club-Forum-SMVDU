const { clubSchema } = require("./schema.js")

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
