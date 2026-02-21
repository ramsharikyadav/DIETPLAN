import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 10-minute server wakeup logic
  const WAKEUP_INTERVAL = 10 * 60 * 1000; // 10 minutes
  const APP_URL = process.env.APP_URL;

  setInterval(async () => {
    console.log(`[Wakeup] Periodic server wakeup triggered at ${new Date().toISOString()}`);
    
    if (APP_URL) {
      try {
        const response = await fetch(`${APP_URL}/api/health`);
        if (response.ok) {
          console.log("[Wakeup] Successfully pinged self via APP_URL");
        } else {
          console.warn(`[Wakeup] Self-ping failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error("[Wakeup] Error during self-ping:", error);
      }
    } else {
      console.log("[Wakeup] APP_URL not defined, skipping self-ping. Internal task completed.");
    }
  }, WAKEUP_INTERVAL);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Wakeup interval set to every 10 minutes.`);
  });
}

startServer();
