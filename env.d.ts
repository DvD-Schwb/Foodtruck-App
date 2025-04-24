declare namespace NodeJS {
  interface ProcessEnv {
    // React-spezifisch
    SUPABASE_URL: string;
    SUPABASE_LOCAL_URL: string;

    SUPABASE_ANON_KEY: string;
    SUPABASE_LOCAL_ANON_KEY: string;

    // Allgemeine Variablen
    NODE_ENV: "development" | "production" | "test";

    // Weitere Umgebungsvariablen hier deklarieren...
  }
}
