// utils/jwt.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "7d";

if (!ACCESS_SECRET) {
  throw new Error("Missing JWT_ACCESS_SECRET in environment");
}

function buildSignOptions(base = {}) {
  // include only valid options that jsonwebtoken expects
  const opts = {};
  if (base.algorithm) opts.algorithm = base.algorithm;
  if (base.expiresIn) opts.expiresIn = base.expiresIn;
  // only set jwtid if it's a non-empty string
  if (typeof base.jti === "string" && base.jti.length > 0) opts.jwtid = base.jti;
  return opts;
}

export function signAccessToken(payload, opts = {}) {
  const signOpts = buildSignOptions({
    algorithm: opts.algorithm || "HS256",
    expiresIn: opts.expiresIn || ACCESS_EXPIRES,
    jti: opts.jti,
  });
  return jwt.sign(payload, ACCESS_SECRET, signOpts);
}

export function signRefreshToken(payload, opts = {}) {
  if (!REFRESH_SECRET) throw new Error("Missing JWT_REFRESH_SECRET in environment");
  const signOpts = buildSignOptions({
    algorithm: opts.algorithm || "HS256",
    expiresIn: opts.expiresIn || REFRESH_EXPIRES,
    jti: opts.jti,
  });
  return jwt.sign(payload, REFRESH_SECRET, signOpts);
}

export function decodeToken(token) {
  return jwt.decode(token, { complete: true });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
