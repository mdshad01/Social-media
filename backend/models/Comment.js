const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // cleark userId
  },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
