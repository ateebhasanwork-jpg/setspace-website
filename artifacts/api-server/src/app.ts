import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import zlib from "zlib";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  const staticDir = path.join(process.cwd(), "artifacts/setspace/dist/public");

  const MIME: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".json": "application/json",
    ".xml": "application/xml",
    ".txt": "text/plain",
  };

  const COMPRESSIBLE = new Set([".html", ".js", ".mjs", ".css", ".svg", ".json", ".xml", ".txt"]);

  interface CacheEntry {
    raw: Buffer;
    gzip: Buffer;
    etag: string;
  }

  const fileCache = new Map<string, CacheEntry>();

  function getEntry(filePath: string, immutable: boolean): CacheEntry {
    if (immutable && fileCache.has(filePath)) return fileCache.get(filePath)!;
    const raw = fs.readFileSync(filePath);
    const gzip = zlib.gzipSync(raw, { level: 6 });
    const etag = `"${crypto.createHash("md5").update(raw).digest("hex").slice(0, 16)}"`;
    const entry: CacheEntry = { raw, gzip, etag };
    if (immutable) fileCache.set(filePath, entry);
    return entry;
  }

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }
    try {
      const urlPath = req.path;
      const ext = path.extname(urlPath).toLowerCase();
      let filePath: string;
      let isImmutable: boolean;

      if (ext && MIME[ext]) {
        const candidate = path.join(staticDir, urlPath);
        if (fs.existsSync(candidate)) {
          filePath = candidate;
          isImmutable = ext !== ".html";
        } else {
          filePath = path.join(staticDir, "index.html");
          isImmutable = false;
        }
      } else {
        filePath = path.join(staticDir, "index.html");
        isImmutable = false;
      }

      const fileExt = path.extname(filePath).toLowerCase();
      const mimeType = MIME[fileExt] ?? "application/octet-stream";

      // Stream video files with range request support
      if (fileExt === ".mp4" || fileExt === ".webm" || fileExt === ".mov") {
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const rangeHeader = req.headers.range;
        res.setHeader("Content-Type", mimeType);
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        if (rangeHeader) {
          const parts = rangeHeader.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 2 * 1024 * 1024, fileSize - 1);
          const chunkSize = end - start + 1;
          res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
          res.setHeader("Content-Length", chunkSize);
          res.status(206);
          fs.createReadStream(filePath, { start, end }).pipe(res);
        } else {
          res.setHeader("Content-Length", fileSize);
          fs.createReadStream(filePath).pipe(res);
        }
        return;
      }

      const { raw, gzip, etag } = getEntry(filePath, isImmutable);

      res.setHeader("Content-Type", mimeType);
      res.setHeader("ETag", etag);
      res.setHeader("Cache-Control", isImmutable ? "public, max-age=31536000, immutable" : "no-cache");
      res.setHeader("Vary", "Accept-Encoding");

      if (req.headers["if-none-match"] === etag) {
        res.status(304).end();
        return;
      }

      const acceptsGzip = (req.headers["accept-encoding"] ?? "").includes("gzip");
      if (acceptsGzip && COMPRESSIBLE.has(fileExt)) {
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Content-Length", gzip.length);
        res.end(gzip);
      } else {
        res.setHeader("Content-Length", raw.length);
        res.end(raw);
      }
    } catch (err) {
      console.error("[static] error serving", req.path, err);
      res.status(500).end("Internal Server Error");
    }
  });
}

app.use("/api", router);

export default app;
