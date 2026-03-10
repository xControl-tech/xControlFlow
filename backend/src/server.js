import express from "express";
import cors from "cors";
import { configSchema } from "./schema.js";
import { loadConfig, saveConfig } from "./configStore.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/config", async (_req, res) => {
  try {
    const { configPath, parsed } = await loadConfig();
    res.json({ path: configPath, config: parsed });
  } catch (error) {
    res.status(500).json({ error: "Failed to load config", detail: String(error) });
  }
});

app.post("/api/config/validate", async (req, res) => {
  const result = configSchema.safeParse(req.body || {});
  if (!result.success) {
    return res.status(400).json({ valid: false, issues: result.error.issues });
  }
  res.json({ valid: true });
});

app.post("/api/config/save", async (req, res) => {
  const result = configSchema.safeParse(req.body || {});
  if (!result.success) {
    return res.status(400).json({ saved: false, issues: result.error.issues });
  }
  try {
    const { configPath } = await saveConfig(result.data);
    res.json({ saved: true, path: configPath });
  } catch (error) {
    res.status(500).json({ saved: false, error: String(error) });
  }
});

app.post("/api/config/export", async (req, res) => {
  const result = configSchema.safeParse(req.body || {});
  if (!result.success) {
    return res.status(400).json({ exported: false, issues: result.error.issues });
  }
  try {
    const { yamlText } = await saveConfig(result.data);
    res.type("text/yaml").send(yamlText);
  } catch (error) {
    res.status(500).json({ exported: false, error: String(error) });
  }
});

app.listen(port, () => {
  console.log(`xControlFlow API listening on port ${port}`);
});
