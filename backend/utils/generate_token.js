// utils/generate_token.js

import { signAccessToken, signRefreshToken } from "./jwt.js";
import dotenv from "dotenv";

dotenv.config();

const [, , type, subject] = process.argv;

if (!type || !subject) {
  console.log("Usage:");
  console.log("  node utils/generate_token.js access <userId>");
  console.log("  node utils/generate_token.js refresh <userId>");
  process.exit(1);
}

if (type === "access") {
  console.log(signAccessToken({ sub: subject }));
} else if (type === "refresh") {
  console.log(signRefreshToken({ sub: subject }));
} else {
  console.log("Invalid type. Use: access | refresh");
}
