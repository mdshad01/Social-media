const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

// Like a post
router.post("/", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const existing = await Like.findOne({ userId, postId });
    if (existing) {
      return res.status(400).json({ error: "Post already liked" });
    }

    const like = new Like({ userId, postId });
    await like.save();
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: "Like failed", details: err });
  }
});

// Unlike a post
router.delete("/", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const result = await Like.findOneAndDelete({ userId, postId });
    if (!result) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.json({ message: "Post unliked" });
  } catch (err) {
    res.status(500).json({ error: "Unlike failed" });
  }
});

module.exports = router;
