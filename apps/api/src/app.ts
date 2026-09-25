import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import fs from "fs";
import chatRoutes from "./routes/chat.js";
import partsRoutes from "./routes/parts.js";
import sessionsRoutes from "./routes/sessions.js";
import authRoutes from "./routes/auth.js";
import alertsRoutes from "./routes/alerts.js";
import telemetryRoutes from "./routes/telemetry.js";

// NOTE (vercel-deploy branch): the scrape routes are intentionally NOT mounted
// here. The scraper depends on Playwright/Chromium, which cannot run inside a
// Vercel serverless function. Run scraping jobs from a local machine instead.
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

function firstExistingDir(...dirs: string[]): string | null {
  for (const d of dirs) {
    try {
      if (fs.existsSync(d) && fs.statSync(d).isDirectory()) return d;
    } catch {
      /* ignore */
    }
  }
  return null;
}

export function createApp(): express.Express {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "256kb" }));

  const requestCounts = new Map<string, { count: number; resetAt: number }>();
  app.use((req, res, next) => {
    const now = Date.now();
    const clientKey = req.ip || req.socket.remoteAddress || "unknown";
    const current = requestCounts.get(clientKey);
    if (!current || current.resetAt <= now) {
      requestCounts.set(clientKey, { count: 1, resetAt: now + 60_000 });
      next();
      return;
    }
    if (current.count >= 120) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }
    current.count += 1;
    next();
  });

  app.use("/api", authRoutes);
  // AI chat is opt-in: only mount when explicitly enabled (off by default on
  // public deployments). Set DECKSMITH_AI_CHAT=1 to enable.
  if (process.env.DECKSMITH_AI_CHAT === "1") {
    app.use("/api", chatRoutes);
  }
  app.use("/api", partsRoutes);
  app.use("/api", sessionsRoutes);
  app.use("/api", telemetryRoutes);
  app.use("/api/alerts", alertsRoutes);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Static assets for persistent hosts (local dev / Render-style). On Vercel
  // these directories don't exist next to the serverless function, so this is
  // skipped there — Vercel serves apps/web/dist as static files itself.
  const partsDir = firstExistingDir(
    path.resolve(process.cwd(), "apps/web/public/parts"),
    path.resolve(process.cwd(), "../web/public/parts"),
  );
  if (partsDir) {
    app.use("/parts", express.static(partsDir));
  }

  const webDist = firstExistingDir(
    path.resolve(process.cwd(), "apps/web/dist"),
    path.resolve(process.cwd(), "../web/dist"),
  );
  if (webDist) {
    app.use(express.static(webDist));
    app.get(/^\/(?!api|health).*/, (_req, res) => {
      res.sendFile(path.join(webDist, "index.html"));
    });
    console.log(`🌐 Serving web app from ${webDist}`);
  }

  return app;
}
