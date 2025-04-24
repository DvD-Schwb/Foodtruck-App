// packages/shared/src/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { getConfig } from "./config";
import type { Database } from "./types/database.types";

const config = getConfig();
export const supabase = createClient<Database>(
  config.supabase.url,
  config.supabase.anonKey
);
