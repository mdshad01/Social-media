const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  mediaUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
