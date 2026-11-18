//logica di gestione del post della pagine weather

//const fetch = require("node-fetch"); // da installare npm install node-fetch@2 -->
//fetch è una funzione che permette di fare richieste HTTP (GET, POST, PUT, DELETE) verso un server o un'API. nel caso non sia nativo e va installata la libreria
const fetch = require("node-fetch");
const { getWeather } = require("../utils/apiClient");
const { normalizeWeather } = require("../utils/normalizeWeather");
const { validateCity } = require("../utils/validateCity");
//const { WEATHER_API_KEY } = require("../utils/constants");
const { WEATHER_API_KEY } = require("../../config/env");
const { logError } = require("../utils/logger");

exports.weatherController = async (req, res) => {
    const city = req.body.city;

    console.log("DEBUG API KEY:", WEATHER_API_KEY);
    console.log("DEBUG CITY:", city);

    if (!validateCity(city)) {
        return res.json({ error: true, message: "Città non valida" });
    }

    try {
        const data = await getWeather(city, WEATHER_API_KEY);

        if (data.cod != 200) {
            return res.json({ error: true, message: "Città non trovata" });
        }

        const normalized = normalizeWeather(data);

        try {
            await fetch("http://localhost:3003/api/db/weather", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    city: normalized.city,
                    description: normalized.description,
                    temperature: normalized.temperature,
                    humidity: normalized.humidity,
                    wind: normalized.wind,
                    country: data.sys?.country || ""
                })
            });
        } catch (dbError) {
            console.error("Errore nel salvataggio meteo nel database service:", dbError);
        }

        return res.json(normalized);

    } catch (err) {
        logError(err);
        return res.json({ error: true, message: "Errore nel server" });
    }
};