require("dotenv").config();

const express = require("express");
const { connectToMongoDB } = require("./config/database");
const User = require("./models/User");
const WeatherSearch = require("./models/WeatherSearch");

const app = express();
const port = Number(process.env.PORT) || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", async (req, res) => {
    res.json({ ok: true, service: "mongo-service" });
});

app.get("/api/db/users", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).lean();
        res.json(users);
    } catch (error) {
        console.error("Errore nel recupero utenti:", error);
        res.status(500).json({ error: true, message: "Errore nel recupero utenti" });
    }
});

app.post("/api/db/users", async (req, res) => {
    try {
        const { name, email, source } = req.body || {};

        if (!email) {
            return res.status(400).json({ error: true, message: "Email richiesta" });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { $set: { name: name || "", email, source: source || "demo" } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(201).json(user);
    } catch (error) {
        console.error("Errore nel salvataggio utente:", error);
        return res.status(500).json({ error: true, message: "Errore nel salvataggio utente" });
    }
});

app.get("/api/db/weather", async (req, res) => {
    try {
        const history = await WeatherSearch.find().sort({ requestedAt: -1 }).limit(10).lean();
        res.json(history);
    } catch (error) {
        console.error("Errore nel recupero storico meteo:", error);
        res.status(500).json({ error: true, message: "Errore nel recupero storico" });
    }
});

app.post("/api/db/weather", async (req, res) => {
    try {
        const { city, country, description, temperature, humidity, wind } = req.body || {};

        if (!city) {
            return res.status(400).json({ error: true, message: "Città richiesta" });
        }

        const weatherEntry = await WeatherSearch.create({
            city,
            country: country || "",
            description: description || "",
            temperature: Number(temperature) || 0,
            humidity: Number(humidity) || 0,
            wind: Number(wind) || 0
        });

        return res.status(201).json(weatherEntry);
    } catch (error) {
        console.error("Errore nel salvataggio meteo:", error);
        return res.status(500).json({ error: true, message: "Errore nel salvataggio meteo" });
    }
});

async function startServer() {
    try {
        await connectToMongoDB();
        app.listen(port, () => {
            console.log(`Mongo service avviato su http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Avvio mongo-service fallito:", error);
        process.exit(1);
    }
}

startServer();
