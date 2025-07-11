const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Input routes

const postRoutes = require("./routers/postRouter");
const userRoutes = require("./routers/userRouter");
const likeRoutes = require("./routers/likeRouter");
const commentRoutes = require("./routers/commentRouter");

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Database connected 😎"));
