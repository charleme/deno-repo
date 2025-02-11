import * as v from "valibot";

export const dbEnvSchema = v.object({
  NODE_ENV: v.picklist(["development", "production"]),
});
