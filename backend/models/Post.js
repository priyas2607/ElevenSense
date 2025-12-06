import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: "" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
