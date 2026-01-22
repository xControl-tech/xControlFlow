import { z } from "zod";

export const deviceSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  label: z.string().optional(),
  args: z.record(z.unknown()).optional()
});

export const componentSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  label: z.string().optional(),
  args: z.record(z.unknown()).optional(),
  events: z.record(z.unknown()).optional()
});

export const groupSchema = z.object({
  id: z.string().min(1),
  label: z.string().optional(),
  components: z.array(componentSchema).default([])
});

export const configSchema = z.object({
  devices: z.array(deviceSchema).default([]),
  actions: z.array(z.record(z.unknown())).default([]),
  groups: z.array(groupSchema).default([])
});
