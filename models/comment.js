const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
  upVote: {
    type: Number,
    default: 0,
  },
  downVote: {
    type: Number,
    default: 0,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: { maxDepth: 10 },
    },
  ],
  listingId: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
  },
});

commentSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Comment", commentSchema);
