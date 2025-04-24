// packages/shared/src/config/index.ts
function detectEnvironment() {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return "mobile";
  }
  return "web";
}

export const getConfig = () => {
  const env = detectEnvironment();

  const baseConfig = {
    // Gemeinsame Konfigurationen hier
  };

  if (env === "mobile") {
    try {
      // Dynamischer Import für Expo Constants
      const Constants = require("expo-constants");
      return {
        ...baseConfig,
        supabase: {
          url: Constants.expoConfig?.extra?.SUPABASE_URL || "",
          anonKey: Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || "",
        },
      };
    } catch (e) {
      console.warn("Failed to load Expo Constants");
      return {
        ...baseConfig,
        supabase: { url: "", anonKey: "" },
      };
    }
  } else {
    // Web-Konfiguration
    return {
      ...baseConfig,
      supabase: {
        url: process.env.SUPABASE_URL || "",
        anonKey: process.env.SUPABASE_ANON_KEY || "",
      },
    };
  }
};
