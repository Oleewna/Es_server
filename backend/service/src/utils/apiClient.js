// gestione dell'apikey
//const fetch = require("node-fetch"); // da installare npm install node-fetch@2 -->

async function getWeather(city, apiKey) {
    const query = encodeURIComponent(city.trim());
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=it`;

    const response = await fetch(url); // fetch nativo di Node 24
    return response.json();
}

module.exports = { getWeather };
