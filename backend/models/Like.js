const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Like", likeSchema);
