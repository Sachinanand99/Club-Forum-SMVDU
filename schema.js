const Joi = require("joi");
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      url: Joi.string().allow("", null),
      fileName: Joi.string().allow("", null),
    }),
    category: Joi.string().valid("Hostel", "School", "Mess").allow("", null),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    comment: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().allow("", null),
      fileName: Joi.string().allow("", null),
    }),
  }).required(),
});