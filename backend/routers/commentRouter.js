const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

// Create a comment

router.post("/", async (req, res) => {
  const { userId, postId, content } = req.body;
  try {
    const comment = new Comment({ userId, postId, content });
    const saveComment = await comment.save();
    res.status(201).json(saveComment);
  } catch (error) {
    res.status(400).json({ error: "Failed to post comment", details: error });
  }
});

// Get comments for a post

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

module.exports = router;
