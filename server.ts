import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/index";
import { portfolioDataConfig } from "./src/db/schema";
import { eq, desc } from "drizzle-orm";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.get("/api/portfolio-data", async (req, res) => {
    try {
      const records = await db.select().from(portfolioDataConfig).orderBy(desc(portfolioDataConfig.updatedAt)).limit(1);
      if (records.length > 0) {
        res.json({ data: records[0].data });
      } else {
        res.json({ data: null });
      }
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/portfolio-data", async (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ error: "Missing data" });
      }

      await db.insert(portfolioDataConfig).values({
        data,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error saving portfolio data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
