export function getSupabaseConfig() {
  if (typeof window !== "undefined" && "ReactNativeWebView" in window) {
    // React Native Umgebung
    return {
      url: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
      anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
    };
  } else {
    // Web Umgebung
    return {
      url: process.env.SUPABASE_URL || "",
      anonKey: process.env.SUPABASE_ANON_KEY || "",
    };
  }
}
