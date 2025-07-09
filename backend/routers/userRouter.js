const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create new user
router.post("/", async (req, res) => {
  const { clerkId, username, avatar, cover, name, description, city, school, work, website } = req.body;

  try {
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      clerkId,
      username,
      avatar,
      cover,
      name,
      description,
      city,
      school,
      work,
      website,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: "User creation failed", details: err });
  }
});

// Get user by username
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
