// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import { GoogleGenAI } from "@google/genai";

// shared/schema.ts
import { z } from "zod";
var budgetPlanRequestSchema = z.object({
  budget: z.number().min(1, "Budget must be at least 1 INR"),
  numberOfPeople: z.number().min(1, "Number of people must be at least 1"),
  numberOfBoys: z.number().min(0, "Number of boys must be at least 0").optional(),
  numberOfGirls: z.number().min(0, "Number of girls must be at least 0").optional()
});
var movieSchema = z.object({
  title: z.string(),
  price: z.number(),
  showtimes: z.array(z.string()).min(1).max(3)
});
var transportSchema = z.object({
  method: z.string(),
  estimatedCost: z.number()
});
var foodSchema = z.object({
  restaurantType: z.string(),
  estimatedFoodCost: z.number()
});
var budgetPlanResponseSchema = z.object({
  movies: z.array(movieSchema),
  transport: z.array(transportSchema),
  food: z.array(foodSchema)
});

// server/routes.ts
async function registerRoutes(app2) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  app2.post("/api/generate-plan", async (req, res) => {
    try {
      const validatedData = budgetPlanRequestSchema.parse(req.body);
      const { budget, numberOfPeople, numberOfBoys = 0, numberOfGirls = 0 } = validatedData;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "Google Gemini API key is not configured"
        });
      }
      let groupDescription = `${numberOfPeople} people`;
      if (numberOfBoys > 0 && numberOfGirls > 0) {
        groupDescription += ` (${numberOfBoys} boys and ${numberOfGirls} girls)`;
      } else if (numberOfBoys > 0) {
        groupDescription += ` (${numberOfBoys} boys)`;
      } else if (numberOfGirls > 0) {
        groupDescription += ` (${numberOfGirls} girls)`;
      }
      const prompt = `You are a weekend budget planner. Generate a weekend budget plan for ${groupDescription} with a total budget of ${budget} INR.

Group composition: ${groupDescription}

Based on the group composition, please provide personalized suggestions for:
- Movies: Exactly 1 movie title suitable for this group, with each ticket costing exactly 350 INR. Include exactly 3 different realistic showtimes.
- Transport: 1-2 transport methods with estimated costs
- Restaurants: 1 restaurant type suitable for this group with estimated food cost

IMPORTANT: 
- Consider the group's demographics when suggesting movies and dining options
- For mixed groups, suggest movies and restaurants that appeal to both boys and girls
- For boys-only groups, suggest action/adventure movies and casual dining
- For girls-only groups, suggest romantic/drama movies and nice cafes or restaurants
- Ensure the total estimated cost for movies, transport, and food does NOT exceed ${budget} INR

Return ONLY a JSON object in this exact format:
{
  "movies": [{"title": "Movie Name", "price": 350, "showtimes": ["2:00 PM", "5:00 PM", "8:00 PM"]}],
  "transport": [{"method": "Transport Method", "estimatedCost": 100}],
  "food": [{"restaurantType": "Restaurant Type", "estimatedFoodCost": 400}]
}`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      if (!response.text) {
        throw new Error("No response from Gemini API");
      }
      const cleanedText = response.text.replace(/```json\n?|\n?```/g, "").trim();
      const parsedPlan = JSON.parse(cleanedText);
      const validatedPlan = budgetPlanResponseSchema.parse(parsedPlan);
      if (validatedPlan.movies) {
        validatedPlan.movies = validatedPlan.movies.map((movie) => ({
          ...movie,
          price: 350
        }));
      }
      res.json(validatedPlan);
    } catch (error) {
      console.error("Error generating budget plan:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({
          error: "Invalid request data",
          details: error.message
        });
      }
      res.status(500).json({
        error: "Failed to generate budget plan. Please try again."
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
