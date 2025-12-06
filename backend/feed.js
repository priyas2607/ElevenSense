import express from "express";
import Post from "./models/Post.js";

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Feed fetch error:", err);
    res.status(500).json({ message: "Failed to load feed" });
  }
});

export default router;
