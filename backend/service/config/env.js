// config/env.js
//gestisce e valida le variabili d'ambiente --> sicurezza che esistano e siano valide
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

const requiredVars = ["WEATHER_API_KEY", "PORT"];

requiredVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`La variabile ${key} non è definita nel file .env`);
        process.exit(1);
    }
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/es_server";

module.exports = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    PORT: parseInt(process.env.PORT, 10),
    MONGODB_URI
};