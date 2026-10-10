// gestione dell'apikey
//const fetch = require("node-fetch"); // da installare npm install node-fetch@2 -->

async function getweather(city, apiKey) {
    const url = `https://openweathermap.org{city}&appid=${apiKey}&units=metric&lang=it`;

    const response = await fetch(url); // fetch nativo di Node 24
    return response.json();
}

module.exports = { getweather };
