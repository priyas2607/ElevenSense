// server.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import redis from "./utils/redis.js";
import feedRoutes from "./feed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===========================
   MIDDLEWARE
=========================== */
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5174",
  credentials: true
}));
app.options("*", cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5174",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/feed", feedRoutes);

/* ===========================
   CONNECT MONGODB
=========================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* ===========================
   CONNECT REDIS
=========================== */
redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

/* ===========================
   ROUTES
=========================== */
app.use("/api/auth", authRoutes);

/* ===========================
   START SERVER
=========================== */
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});
