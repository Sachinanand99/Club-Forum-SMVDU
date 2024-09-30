const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  // cr
  title: {
    type: String,
    required: true,
  },
  // later add coordinators from user schema, at the time of designing listing.
  // r
  coordinators: [
    {
      img: {
        url: String,
        fileName: String,
      },
      name: String,
      rollNo: String,
    }
  ],
  // cr
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
  // cr
  description: String,
  // r
  about: [
    {
      title: String,
      desc: String,
    }
  ]
});

clubSchema.post("findOneAndDelete", async (club) => {
  if (club) {
    await Listing.deleteMany({ comments: { _id: { $in: listing.comments } } });
  }
});

const Clubs = mongoose.model("Clubs", clubSchema);
module.exports = Clubs;