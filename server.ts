import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load local environment variables from .env.local when running locally.
dotenv.config({ path: ".env.local" });
// Fallback to .env if .env.local is not present.
dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Lazy Initialization of Gemini Client
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing. Please set it via Secrets Settings.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Debug endpoint to verify environment setup
  app.get("/api/debug", (req, res) => {
    res.json({
      apiKeySet: !!process.env.GEMINI_API_KEY,
      apiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  // API endpoint for interactive AI Audit Blueprint generation
  app.post("/api/audit", async (req, res) => {
    try {
      const { companyName, industry, employeeCount, primaryBottleneck, techStack } = req.body;

      if (!companyName || !primaryBottleneck) {
        return res.status(400).json({ error: "Company name and primary bottleneck are required fields." });
      }

      const prompt = `Perform an elite, premium-grade AI and operations automation teardown and audit for "${companyName}" in the "${industry || 'B2B/General'}" industry.
The company has ${employeeCount || '10-50'} employees.
Their current technology stack consists of: "${techStack || 'Spreadsheets and manual email'}".
Their primary manual bottleneck/operational leak is described as: "${primaryBottleneck}".

Analyze this manual process carefully. Identify 3 concrete, high-ROI places where custom AI agents, automated workflow systems, or intelligent middleware (like custom dashboards or n8n routines) can replace human labor, recover lost revenue, and prevent leaks. 

In addition, construct a sequential 4-step flowchart structure (blueprintSteps) outlining the optimal automated integration pipeline.

Calculate precise estimated numeric returns based on their size and industry benchmarks.

Finally, write an elite executive proposal as a formal draft from HashLink Corp. styled as markdown. The text fields should feel premium, elite, highly analytical, and technically sophisticated (incorporating systems-level language).`;

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the Chief AI Architect and Managing Partner of HashLink Corp., a legendary digital engineering studio. Your advice is elite, highly precise, ROI-focused, and free of generic fluff or sales-pitch clichés. Your tone is academic yet commercially aggressive: technical, authoritative, and direct.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: {
                type: Type.STRING,
                description: "Executive summary emphasizing financial leverage, margin expansion, and tech-driven scalability."
              },
              findings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    issue: { type: Type.STRING, description: "Identified operational bottleneck or technical friction point." },
                    impact: { type: Type.STRING, description: "Quantifiable or operational impact of leaving this unchecked." },
                    solution: { type: Type.STRING, description: "Exactly how HashLink will build a system to automate this." },
                    complexity: { type: Type.STRING, description: "Low, Medium, or High complexity to build" }
                  },
                  required: ["issue", "impact", "solution", "complexity"]
                }
              },
              blueprintSteps: {
                type: Type.ARRAY,
                description: "Exactly 4 steps representing the logical information flow of the proposed automation pipeline.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.INTEGER },
                    label: { type: Type.STRING, description: "Concise title of this step (e.g. Ingest & Classify)" },
                    description: { type: Type.STRING, description: "Clear explanation of the action" },
                    systemUsed: { type: Type.STRING, description: "The underlying systems, API, or LLM agent responsible" }
                  },
                  required: ["stepNumber", "label", "description", "systemUsed"]
                }
              },
              estimatedReturn: {
                type: Type.OBJECT,
                properties: {
                  hoursSavedWeekly: { type: Type.INTEGER, description: "Weekly hours saved across the team by automating this flow" },
                  monthlySavingsDollars: { type: Type.INTEGER, description: "Direct financial optimization in dollars per month" },
                  roiPercentage: { type: Type.INTEGER, description: "Projected annual ROI % (e.g., 400 for 400%)" }
                },
                required: ["hoursSavedWeekly", "monthlySavingsDollars", "roiPercentage"]
              },
              draftProposal: {
                type: Type.STRING,
                description: "A formal draft proposal formatted in clean markdown. Section headers should outline: Project Boundary, Phase Milestones, Scope of Deliverables, and Commercial Terms."
              }
            },
            required: ["executiveSummary", "findings", "blueprintSteps", "estimatedReturn", "draftProposal"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No response generated from the AI model.");
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text.trim());
      } catch (parseError: any) {
        console.error("JSON Parse Error - Raw Response:", text);
        throw new Error(`Invalid JSON response from Gemini: ${parseError.message}`);
      }

      res.json(parsedResponse);
    } catch (error: any) {
      console.error("Express Audit Route Error:", error);
      const statusCode = error.message?.includes("missing") ? 400 : 500;
      res.status(statusCode).json({ 
        error: error.message || "An error occurred during audit synthesis. Make sure GEMINI_API_KEY is configured.",
        debug: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for development");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from dist/");
  }

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
