// middleware/jwt.js
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";

/**
 * createJwtMiddleware(opts)
 * opts.sources -> can be:
 *   - string like "header,cookie,query"
 *   - array like ["header","cookie"]
 *   - omitted -> uses process.env.TOKEN_SOURCES or "header"
 */
export function createJwtMiddleware(opts = {}) {
  // normalize sources to array of trimmed strings
  let sourcesRaw = opts.sources ?? process.env.TOKEN_SOURCES ?? "header";

  // If an array was passed in, use it. If string, split by comma.
  const sources =
    Array.isArray(sourcesRaw) ? sourcesRaw.map((s) => String(s).trim()) :
    typeof sourcesRaw === "string" ? sourcesRaw.split(",").map((s) => s.trim()) :
    // fallback: coerce to string and split
    String(sourcesRaw).split(",").map((s) => s.trim());

  const headerName = opts.headerName || "authorization";
  const cookieName = opts.cookieName || process.env.REFRESH_COOKIE_NAME || "jid";

  const onError =
    opts.onError ||
    ((err, req, res, next) => {
      return res.status(401).json({
        error: "Unauthorized",
        message: err.message,
      });
    });

  function extractToken(req) {
    for (const src of sources) {
      if (src === "header") {
        const raw = req.header(headerName) || "";
        if (!raw) continue;
        const parts = raw.split(" ");
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
        return raw;
      }

      if (src === "cookie") {
        if (req.cookies && req.cookies[cookieName]) {
          return req.cookies[cookieName];
        }
      }

      if (src === "query") {
        if (req.query && req.query.token) return req.query.token;
      }
    }
    return null;
  }

  function verifyAccessTokenMiddleware(req, res, next) {
    try {
      const token = extractToken(req);
      if (!token) {
        return res.status(401).json({
          error: "missing_token",
          message: "Access token required",
        });
      }

      const payload = verifyAccessToken(token);
      req.user = { ...payload };
      next();
    } catch (err) {
      onError(err, req, res, next);
    }
  }

  function verifyRefreshTokenMiddleware(req) {
    const token =
      req.cookies?.[cookieName] ||
      req.body?.refreshToken ||
      req.query?.refreshToken;

    if (!token) throw new Error("missing_refresh_token");

    return verifyRefreshToken(token);
  }

  function requireAuth(handler) {
    return (req, res, next) => {
      verifyAccessTokenMiddleware(req, res, (err) => {
        if (err) return next(err);
        return handler(req, res, next);
      });
    };
  }

  return {
    extractToken,
    verifyAccessToken: verifyAccessTokenMiddleware,
    verifyRefreshTokenMiddleware,
    requireAuth,
  };
}
