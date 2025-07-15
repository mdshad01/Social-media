const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Get user by username
router.get("/by-username/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add this to support GET /api/users/:clerkId
router.get("/:clerkId", async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update user profile info by Clerk ID
router.put("/:clerkId", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ clerkId: req.params.clerkId }, { $set: req.body }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
    console.log("🟡 Update payload:", req.body);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err });
  }
});

// ✅ Create new user (on first Clerk login)
router.post("/", async (req, res) => {
  const { clerkId, username, avatar, cover, name, description, city, school, work, website } = req.body;

  try {
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(200).json(existingUser); // ✅ return existing user if found
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
      createdAt: new Date(),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: "User creation failed", details: err });
  }
});

// ✅ Follow a user
router.post("/follow", async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  try {
    if (currentUserId === targetUserId) {
      return res.status(400).json({ error: "You can't follow yourself." });
    }

    const currentUser = await User.findOne({ clerkId: currentUserId });
    const targetUser = await User.findOne({ clerkId: targetUserId });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ error: "Already following." });
    }

    targetUser.followers.push(currentUserId);
    currentUser.following.push(targetUserId);

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Followed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Follow failed", details: err });
  }
});

// ✅ Unfollow a user
router.post("/unfollow", async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  try {
    const currentUser = await User.findOne({ clerkId: currentUserId });
    const targetUser = await User.findOne({ clerkId: targetUserId });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    targetUser.followers = targetUser.followers.filter((id) => id !== currentUserId);
    currentUser.following = currentUser.following.filter((id) => id !== targetUserId);

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Unfollowed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Unfollow failed", details: err });
  }
});

module.exports = router;
