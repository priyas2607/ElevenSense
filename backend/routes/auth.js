// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import redis from "../utils/redis.js";
import User from "../models/User.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../utils/jwt.js";
import { createJwtMiddleware } from "../middleware/jwt.js";

const router = express.Router();
const jwtMiddleware = createJwtMiddleware({ sources: "cookie,header" });

const OTP_TTL = Number(process.env.OTP_TTL_SECONDS || 600);
const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);

function genOtp(len = 6){
  const min = Math.pow(10, len-1);
  const max = Math.pow(10, len) - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

function otpKey(email, phone){ return `otp:${email}:${phone}`; }
function verifiedKey(email, phone){ return `otp-verified:${email}:${phone}`; }

/** Request OTP **/
router.post("/request-otp", async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email || !phone) return res.status(400).json({ message: "email and phone required" });

    const otp = genOtp(6);
    const key = otpKey(email.toLowerCase(), phone);

    const payload = { otp, attempts: 0 };
    await redis.set(key, JSON.stringify(payload), "EX", OTP_TTL);

    console.log("Generated OTP:", otp, "for", email, phone);

    return res.json({ message: "OTP sent (dev-mode)" });
  } catch (err) {
    console.error("request-otp err:", err);
    return res.status(500).json({ message: "Failed to request OTP" });
  }
});

/** Verify OTP **/
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, phone, otp } = req.body;
    if (!email || !phone || !otp) return res.status(400).json({ message: "email, phone, otp required" });

    const key = otpKey(email.toLowerCase(), phone);
    const raw = await redis.get(key);
    if (!raw) return res.status(400).json({ message: "OTP expired or not found" });

    const parsed = JSON.parse(raw);
    parsed.attempts = (parsed.attempts || 0) + 1;

    if (parsed.attempts > OTP_MAX_ATTEMPTS) {
      await redis.del(key);
      return res.status(429).json({ message: "Too many attempts" });
    }

    await redis.set(key, JSON.stringify(parsed), "EX", OTP_TTL);

    if (String(parsed.otp) !== String(otp)) return res.status(400).json({ message: "Invalid OTP" });

    await redis.del(key);
    await redis.set(verifiedKey(email.toLowerCase(), phone), "1", "EX", 900);

    const preToken = jwt.sign(
      { email: email.toLowerCase(), phone },
      process.env.JWT_PRE_SIGNING_SECRET || process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ message: "OTP verified", preToken });
  } catch (err) {
    console.error("verify-otp err:", err);
    return res.status(500).json({ message: "OTP verification failed" });
  }
});

/** Create account **/
router.post("/create-account", async (req, res) => {
  try {
    const { username, password, email, phone, preToken } = req.body;
    if (!username || !password || !email || !phone)
      return res.status(400).json({ message: "username, password, email, phone required" });

    let verified = false;

    if (preToken) {
      try {
        const payload = jwt.verify(
          preToken,
          process.env.JWT_PRE_SIGNING_SECRET || process.env.JWT_ACCESS_SECRET
        );
        if (payload.email === email.toLowerCase() && payload.phone === phone)
          verified = true;
      } catch {}
    } else {
      const v = await redis.get(verifiedKey(email.toLowerCase(), phone));
      if (v) verified = true;
    }

    if (!verified) return res.status(403).json({ message: "Email+phone not verified" });

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }, { username }]
    });
    if (existing)
      return res.status(409).json({ message: "email, phone or username already in use" });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      email: email.toLowerCase(),
      phone,
      username,
      passwordHash
    });

    await user.save();

    await redis.del(verifiedKey(email.toLowerCase(), phone));

    const accessToken = signAccessToken({
      sub: user._id,
      username: user.username
    });
    const refreshToken = signRefreshToken({ sub: user._id });

    const cookieOptions = {
      httpOnly: process.env.COOKIE_HTTP_ONLY !== "false",
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      path: "/"
    };

    res.cookie(
      process.env.REFRESH_COOKIE_NAME || "jid",
      refreshToken,
      { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }
    );

    return res.json({
      message: "Account created",
      accessToken,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (err) {
    console.error("create-account err:", err);
    return res.status(500).json({ message: "Failed to create account" });
  }
});

/** Login **/
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: usernameOrEmail?.toLowerCase() },
        { username: usernameOrEmail }
      ]
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken({
      sub: user._id,
      username: user.username
    });
    const refreshToken = signRefreshToken({ sub: user._id });

    const cookieOptions = {
      httpOnly: process.env.COOKIE_HTTP_ONLY !== "false",
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      path: "/"
    };

    res.cookie(
      process.env.REFRESH_COOKIE_NAME || "jid",
      refreshToken,
      { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }
    );

    return res.json({
      message: "Logged in",
      accessToken,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (err) {
    console.error("login err:", err);
    return res.status(500).json({ message: "Login failed" });
  }
});

/** Refresh **/
router.post("/refresh-token", async (req, res) => {
  try {
    const token =
      req.cookies[process.env.REFRESH_COOKIE_NAME || "jid"] ||
      req.body.refreshToken ||
      req.headers["x-refresh-token"];

    if (!token) return res.status(401).json({ message: "Missing refresh token" });

    const payload = verifyRefreshToken(token);

    const user = await User.findById(payload.sub);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accessToken = signAccessToken({
      sub: user._id,
      username: user.username
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("refresh err:", err);
    return res.status(500).json({ message: "Refresh failed" });
  }
});

/** Protected: /me **/
router.get("/me", jwtMiddleware.verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      id: user._id,
      email: user.email,
      username: user.username
    });
  } catch (err) {
    console.error("me err:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
