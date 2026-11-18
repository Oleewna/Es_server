async function loadWeatherHistory() {
    const historyBox = document.getElementById("weather-history");
    if (!historyBox) return;

    historyBox.innerHTML = "<div class='weather-response-box subtitle'>Caricamento...</div>";

    const candidateUrls = [
        "/api/v1/db/weather",
        "http://localhost:3000/api/v1/db/weather"
    ];

    for (const url of candidateUrls) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("Risposta storico non valida");

            if (data.length === 0) {
                historyBox.innerHTML = "<div class='weather-response-box subtitle'>Nessuna ricerca salvata.</div>";
                return;
            }

            const seenCities = new Set();
            const uniqueHistory = data.filter((item) => {
                const cityName = String(item.city || "").trim().toLowerCase();
                if (!cityName || seenCities.has(cityName)) return false;

                seenCities.add(cityName);
                return true;
            }).slice(0, 5);

            historyBox.innerHTML = uniqueHistory
                .map((item) => `
                    <div class="weather-response-box subtitle">
                        <strong>${escapeHtml(item.city)}</strong><br>
                        ${escapeHtml(item.description || "Nessuna descrizione")}<br>
                        Temperatura: ${formatNumber(item.temperature)}°C<br>
                        Umidità: ${formatNumber(item.humidity)}%<br>
                        Vento: ${formatNumber(item.wind)} m/s
                    </div>
                `)
                .join("");
            return;
        } catch (error) {
            console.warn(`Endpoint storico non raggiungibile: ${url}`, error);
        }
    }

    historyBox.innerHTML = "<div class='weather-response-box subtitle'>Impossibile caricare lo storico.</div>";
}

function escapeHtml(value) {
    const element = document.createElement("span");
    element.textContent = value ?? "";
    return element.innerHTML;
}

function formatNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
}

const weatherForm = document.getElementById("weather-form");

if (weatherForm) {
    weatherForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const cityInput = document.getElementById("city-input");
        const submitButton = document.getElementById("weather-submit");
        const box = document.getElementById("weather-result");
        const city = cityInput?.value.trim();

        if (!city) {
            box.style.display = "block";
            box.innerHTML = "<div class='weather-response-box subtitle'>Inserisci una città.</div>";
            return;
        }

        submitButton.disabled = true;
        box.style.display = "block";
        box.innerHTML = "<div class='weather-response-box subtitle'>Caricamento...</div>";

        try {
            const res = await fetch("/api/v1/weather", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ city })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            if (data.error) {
                box.innerHTML = `<div class="weather-response-box subtitle">${escapeHtml(data.message || "Errore meteo")}</div>`;
                return;
            }

            box.innerHTML = `
                <div class="weather-response-box subtitle">
                    <strong>${escapeHtml(data.city)}</strong><br>
                    ${escapeHtml(data.description)}<br>
                    Temperatura: ${formatNumber(data.temperature)}°C<br>
                    Umidità: ${formatNumber(data.humidity)}%<br>
                    Vento: ${formatNumber(data.wind)} m/s
                </div>
            `;

            await loadWeatherHistory();
        } catch (error) {
            console.error("Errore richiesta meteo:", error);
            box.innerHTML = "<div class='weather-response-box subtitle'>Errore nel server meteo. Riprova.</div>";
        } finally {
            submitButton.disabled = false;
        }
    });
}

loadWeatherHistory();

/*DOM Javascript della pagina lato client ha queste caratteristiche:
- seleziona elementi del DOM (getElementById)

- intercetta un evento (addEventListener("submit"))

- legge un valore da un input (city-input)

- aggiorna il DOM (innerHTML)
*/
