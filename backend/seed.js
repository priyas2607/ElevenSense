import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/Post.js";

dotenv.config();

const mockPosts = [
  {
    title: "AI Summarizes the Week: Key Highlights",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    tags: ["AI", "Technology"],
  },
  {
    title: "Markets React to New Data",
    image: "https://images.unsplash.com/photo-1559521783-1c58b2dbea98",
    tags: ["Finance", "Economy"],
  },
  {
    title: "Designers Rethink Mobile Layouts",
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702",
    tags: ["Design", "UI/UX"],
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Seeding MongoDB…");
    await Post.insertMany(mockPosts);
    console.log("Done!");
    process.exit();
  })
  .catch((err) => console.error(err));
