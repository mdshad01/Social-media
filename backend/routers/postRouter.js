const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create a Post

router.post("/", async (req, res) => {
  const { authorId, description, mediaUrl } = req.body;

  try {
    const newPost = new Post({
      authorId,
      description,
      mediaUrl,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: "Post creation failed", details: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = router;
