const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
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
  // listings: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Listing",
  //   },
  // ],
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
    // await Listing.deleteMany({ _id: { $in: club.listings } });
  }
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
