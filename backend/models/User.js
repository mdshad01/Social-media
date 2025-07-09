const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // from Clerk
  username: { type: String, required: true, unique: true },
  avatar: String,
  cover: String,
  name: String,
  description: String,
  city: String,
  school: String,
  work: String,
  website: String,
  followers: [String], // array of clerkIds
  following: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
