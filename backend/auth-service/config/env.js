const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../.env");
const legacyEnvPath = path.resolve(__dirname, "../env");
const resolvedEnvPath = fs.existsSync(envPath)
  ? envPath
  : fs.existsSync(legacyEnvPath)
    ? legacyEnvPath
    : null;

if (resolvedEnvPath) {
  dotenv.config({ path: resolvedEnvPath });
} else {
  dotenv.config();
}

module.exports = {
  AUTH_PORT: parseInt(process.env.AUTH_PORT || "3001", 10),
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
};