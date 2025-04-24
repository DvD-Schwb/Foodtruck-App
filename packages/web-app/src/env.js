// packages/web-app/src/env.js
const path = require("path");
const dotenv = require("dotenv");

// Lade die zentrale .env-Datei
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
