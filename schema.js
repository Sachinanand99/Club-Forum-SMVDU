const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      fileName: Joi.string().allow("", null),
    }),
    description: Joi.string().required(),
  }).required(),
});

module.exports.clubSchema = Joi.object({
  club: Joi.object({
    title: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      fileName: Joi.string().allow("", null),
    }).required(),
    description: Joi.string().required(),
  }).required(),
});


module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    comment: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().allow("", null),
      fileName: Joi.string().allow("", null),
    }).required(),
  }).required(),
});