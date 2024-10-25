const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment.js");
const Club = require("./club.js"); 


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    fileName: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    // Remove the listing reference from the club's listings array
    await Club.updateOne(
      { _id: listing.club },
      { $pull: { listings: listing._id } }
    );

    // Delete associated comments
    await Comment.deleteMany({ _id: { $in: listing.comments } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
