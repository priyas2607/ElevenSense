import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import { createJwtMiddleware } from "./middleware/jwt.js";
import { signAccessToken, signRefreshToken } from "./utils/jwt.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const jwtMw = createJwtMiddleware({ sources: (process.env.TOKEN_SOURCES || "header").split(",") });

app.post("/api/login", (req, res) => {
  const { userId = "user:123", role = "reader" } = req.body || {};
  const access = signAccessToken({ sub: userId, role });
  const refresh = signRefreshToken({ sub: userId });

  res.cookie(process.env.REFRESH_COOKIE_NAME || "jid", refresh, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json({ accessToken: access });
});

app.get("/api/protected", jwtMw.verifyAccessToken, (req, res) => {
  res.json({ message: "authorized", user: req.user });
});

app.listen(3000, () => console.log("JWT demo running on :3000"));
