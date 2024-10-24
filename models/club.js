const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./listing")

const clubSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // later add coordinators from user schema, at the time of designing listing.
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
  about: [
    {
      title: String,
      desc: String,
    }
  ],
  admins: [
    {
      email: String,
    },
  ],
  coordinators: [
    {
      name: String,
      rollNo: String,
      img:{
        url: String,
        fileName: String,
      }
    }
  ]
});

clubSchema.post("findOneAndDelete", async (club) => {
  if (club) {
    await Listing.deleteMany({ listings: { _id: { $in: club.listings } } });
  }
});

const Clubs = mongoose.model("Clubs", clubSchema);
module.exports = Clubs;
  