const mongoose = require("mongoose");
const initData = require("./data.js");
const Clubs = require("../models/club.js");

const MONGO_URL =
  "mongodb://localhost:27017/clubs";

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
    await Clubs.deleteMany({});
    const updatedData = initData.data.map((obj) => ({
      ...obj,
      coordinators: "671685e7999bd242bdbf1eb3",
    }));
    await Clubs.insertMany(initData.data);
}

initDB();
console.log("data was initialized");
