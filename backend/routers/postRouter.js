const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User"); // ✅ MISSING IMPORT ADDED

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

// Get all posts with user data
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const authorIds = [...new Set(posts.map((p) => p.authorId))];
    const users = await User.find({ clerkId: { $in: authorIds } });

    const postsWithUser = posts.map((post) => {
      const author = users.find((u) => u.clerkId === post.authorId);
      return {
        ...post.toObject(),
        authorInfo: {
          name: author?.name || "Unknown",
          avatar: author?.avatar || "/white.jpg",
        },
      };
    });

    res.json(postsWithUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = router;
