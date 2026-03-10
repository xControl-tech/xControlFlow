import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const defaultConfigPath = path.resolve("./backend/data/settings.yaml");

export const getConfigPath = () => process.env.XCONTROL_CONFIG_PATH || defaultConfigPath;

export const loadConfig = async () => {
  const configPath = getConfigPath();
  const raw = await fs.readFile(configPath, "utf-8");
  const parsed = yaml.load(raw) || {};
  return { configPath, parsed };
};

export const saveConfig = async (config) => {
  const configPath = getConfigPath();
  const yamlText = yaml.dump(config, { lineWidth: 120, noRefs: true });
  await fs.writeFile(configPath, yamlText, "utf-8");
  return { configPath, yamlText };
};
