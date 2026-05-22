import { createClient } from "@supabase/supabase-js";
import { readEnv } from "../config/env.js";

export function createSupabaseServiceClient() {
  const env = readEnv();

  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
