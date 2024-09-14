const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  coordinators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image: {
    url: String,
    fileName: String,
  },
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  description: String,
});

clubSchema.post("findOneAndDelete", async (club) => {
  if (club) {
    await Listing.deleteMany({ comments: { _id: { $in: listing.comments } } });
  }
});

const Clubs = mongoose.model("Clubs", clubSchema);
module.exports = Clubs;