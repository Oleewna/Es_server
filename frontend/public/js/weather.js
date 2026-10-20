document.getElementById("weather-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // evita il redirect

    const city = document.getElementById("city-input").value;
    //const isGatewayPage = window.location.port === "4000" || window.location.pathname.startsWith("/api/v1");
    //const weatherEndpoint = isGatewayPage ? "/api/v1/weather" : "/weather";

    //const res = await fetch(weatherEndpoint, {
    const res = await fetch("/api/v1/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city })
    });

    const data = await res.json(); // eliminato text, per utilizzare il json dal server

    const box = document.getElementById("weather-result");

    // Mostra il box
    box.style.display = "block";

    // Se la città non esiste
    if (data.error) {
        box.innerHTML = `
            <div class="weather-response-box subtitle">
                ${data.message}
            </div>
        `;
        return;
    }

    // Mostra la card meteo
    box.innerHTML = `
        <div class="weather-response-box subtitle">
            <strong>${data.city}</strong><br>
            ${data.description}<br>
            Temperatura: ${data.temperature}°C<br>
            Umidità: ${data.humidity}%<br>
            Vento: ${data.wind} m/s
        </div>
    `;
});

/*DOM Javascript della pagina lato client ha queste caratteristiche:
- seleziona elementi del DOM (getElementById)

- intercetta un evento (addEventListener("submit"))

- legge un valore da un input (city-input)

- aggiorna il DOM (innerHTML)
*/
