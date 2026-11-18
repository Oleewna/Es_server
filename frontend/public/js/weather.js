async function loadWeatherHistory() {
    const historyBox = document.getElementById("weather-history");

    if (!historyBox) return;

    const candidateUrls = [
        "/api/v1/db/weather",
        "http://localhost:3000/api/v1/db/weather",
        "http://localhost:3003/api/db/weather"
    ];

    for (const url of candidateUrls) {
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!Array.isArray(data) || data.length === 0) {
                historyBox.innerHTML = "<div class='weather-response-box subtitle'>Nessuna ricerca salvata.</div>";
                return;
            }

            historyBox.innerHTML = data
                .slice(0, 5)
                .map((item) => `
                    <div class="weather-response-box subtitle">
                        <strong>${item.city}</strong><br>
                        ${item.description || "Nessuna descrizione"}<br>
                        Temperatura: ${item.temperature}°C<br>
                        Umidità: ${item.humidity}%<br>
                        Vento: ${item.wind} m/s
                    </div>
                `)
                .join("");
            return;
        } catch (error) {
            console.warn(`Endpoint non raggiungibile: ${url}`, error);
        }
    }

    historyBox.innerHTML = "<div class='weather-response-box subtitle'>Impossibile caricare lo storico.</div>";
}

document.getElementById("weather-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // evita il redirect

    const city = document.getElementById("city-input").value;
    const res = await fetch("/api/v1/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city })
    });

    const data = await res.json();
    const box = document.getElementById("weather-result");

    box.style.display = "block";

    if (data.error) {
        box.innerHTML = `
            <div class="weather-response-box subtitle">
                ${data.message}
            </div>
        `;
        return;
    }

    box.innerHTML = `
        <div class="weather-response-box subtitle">
            <strong>${data.city}</strong><br>
            ${data.description}<br>
            Temperatura: ${data.temperature}°C<br>
            Umidità: ${data.humidity}%<br>
            Vento: ${data.wind} m/s
        </div>
    `;

    await loadWeatherHistory();
});

loadWeatherHistory();

/*DOM Javascript della pagina lato client ha queste caratteristiche:
- seleziona elementi del DOM (getElementById)

- intercetta un evento (addEventListener("submit"))

- legge un valore da un input (city-input)

- aggiorna il DOM (innerHTML)
*/
