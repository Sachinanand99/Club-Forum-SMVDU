const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");

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
  description: String,
});

const Clubs = mongoose.model("Clubs", clubSchema);
module.exports = Clubs;