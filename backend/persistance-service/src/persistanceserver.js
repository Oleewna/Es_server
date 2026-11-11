const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const env = require("../config/env");

const app = express();
const dataFilePath = path.join(__dirname, "../data/Data.json");

function readDataFile() {
    const raw = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(raw);
}

app.get("/api/data", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json(readDataFile());
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

if (require.main === module) {
    app.listen(env.PERSISTENCE_PORT, () => {
        console.log(`Persistence Service avviato sulla porta ${env.PERSISTENCE_PORT}`);
    });
}

module.exports = { app };