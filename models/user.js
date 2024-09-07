const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    firstName: String,
    lastName: String,
    image: String,
    email: String,
    role: {
        type: [String],
        enum: ["student", "teacher", "house-captain"],
        default: "student",
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
