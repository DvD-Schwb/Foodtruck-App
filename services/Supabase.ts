import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ljnljxgamofrbinxbwso.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqbmxqeGdhbW9mcmJpbnhid3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzMzNDAsImV4cCI6MjA1ODY0OTM0MH0.2AcquHu1IHRNYGITlnPLmae6hdoLvIxcX1wuTsjxLn0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
