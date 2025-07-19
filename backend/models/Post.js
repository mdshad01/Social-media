// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  description: { type: String, required: true },
  mediaUrl: String,
  type: {
    type: String,
    enum: ["text", "photo", "video", "poll", "event"],
    default: "text",
  },
  poll: {
    option1: String,
    option2: String,
  },
  event: {
    title: String,
    date: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Auto-detect media type before saving
postSchema.pre("save", function (next) {
  if (!this.mediaUrl) return next();

  const url = this.mediaUrl.toLowerCase();
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
    this.type = "photo";
  } else if (/\.(mp4|mov|avi|webm)$/i.test(url)) {
    this.type = "video";
  }

  next();
});

module.exports = mongoose.model("Post", postSchema);
