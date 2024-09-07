const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/complaintforum";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
      console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: "66db5f26fe3a4f76462d3609",
    }));
    await Listing.insertMany(updatedData);
}

initDB();
console.log("data was initialized");
