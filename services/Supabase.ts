import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
