const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment.js");


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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: ["Hostel", "School", "Mess"],
  },
  upVote: {
    type: Number,
    default: 0,
  },
  downVote: {
    type: Number,
    default: 0,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Comment.deleteMany({ comments: { _id: { $in: listing.comments } } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
