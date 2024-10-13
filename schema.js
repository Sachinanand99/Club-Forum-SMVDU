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
    description: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      fileName: Joi.string().allow("", null),
    }).required(),
  }),
  coordinators: Joi.array()
    .items(
      Joi.object({
        img: Joi.object({
          url: Joi.string().required(),
          fileName: Joi.string().allow("", null),
        }).required(),
        name: Joi.string().required(),
        rollNo: Joi.string().required(),
      })
    )
    .required(),
  admins: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().required(),
      })
    )
    .required(),
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