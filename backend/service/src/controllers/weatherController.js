//logica di gestione del post della pagine weather

const fetch = require("node-fetch");// da installare npm install node-fetch@2 -->
//fetch è una funzione che permette di fare richieste HTTP (GET, POST, PUT, DELETE) verso un server o un'API. nel caso non è nativo e va installata la libre

exports.weatherController = async (req, res) => {
    const city = req.body.city;
    const apiKey = "0ac7779fc99f7d9c48d2cf22a5271088";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });

    } catch (err) {
        console.error(err);
        res.json({
            error: true,
            message: "Errore nel server"
        });
    }
};


/*const express = require("express");
const router = express.Router();

const apiKey = "0ac7779fc99f7d9c48d2cf22a5271088";

router.post("/weather", async (req, res) => {
    const city = req.body.city;

    if (!city || !city.trim()) {
        return res.json({
            error: true,
            message: "Inserisci una città"
        });
    }

    try {
        const fetchFn = globalThis.fetch;

        if (!fetchFn) {
            throw new Error("fetch non disponibile in questo ambiente");
        }

        const response = await fetchFn(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${apiKey}&units=metric&lang=it`
        );

        const data = await response.json();

        if (!response.ok || data.cod !== 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        return res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });
    } catch (err) {
        console.error(err);
        return res.json({
            error: true,
            message: "Errore nel server"
        });
    }
});

module.exports = router;*/

/*
//logica di gestione del post della pagine weather

//const fetch = require("node-fetch");// da installare npm install node-fetch@2 -->
//fetch è una funzione che permette di fare richieste HTTP (GET, POST, PUT, DELETE) verso un server o un'API. nel caso non è nativo e va installata la libre
const { getWeather } = require("../utils/apiclient");
const { normalizeWeather } = require("../utils/normalizeweather");
const { validateCity } = require("../utils/validateCity");
const { WEATHER_API_KEY } = require("../utils/constants");
const { logError } = require("../utils/logger");

exports.weatherController = async (req, res) => {
    const city = req.body.city;

    if (!validateCity(city)) {
        return res.json({ error: true, message: "Città non valida" });
    }

    try {
        const data = await getWeather(city, WEATHER_API_KEY);

        if (data.cod !== 200) {
            return res.json({ error: true, message: "Città non trovata" });
        }

        res.json(normalizeWeather(data));

    } catch (err) {
        logError(err);
        res.json({ error: true, message: "Errore nel server" });
    }
};
*/