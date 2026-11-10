const getWantedApiUrl = () => {
    const currentOrigin = window.location.origin;
    const maybeV1 = `${currentOrigin}/api/v1/wanted/today`;
    const directLegacy = `${currentOrigin}/api/wanted/today`;
    const directToday = `${currentOrigin}/today`;

    if (currentOrigin) {
        return maybeV1;
    }

    return "http://localhost:3000/api/v1/wanted/today";
};

async function fetchWantedData() {
    const currentOrigin = window.location.origin;
    const candidates = [
        getWantedApiUrl(),
        `${currentOrigin}/api/wanted/today`,
        `${currentOrigin}/today`,
        "http://localhost:3000/api/v1/wanted/today",
        "http://localhost:3002/api/wanted/today",
        "http://localhost:3002/today"
    ];

    for (const url of [...new Set(candidates)]) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return response;
            }
            if (response.status !== 404) {
                return response;
            }
        } catch (error) {
            // continue to the next candidate
        }
    }

    throw new Error("Unable to reach the FBI wanted API.");
}

async function loadWantedCard() {
    const resultBox = document.getElementById("wanted-result");

    resultBox.style.display = "block";
    resultBox.innerHTML = "<div class='weather-response-box subtitle'>Caricamento...</div>";

    try {
        const response = await fetchWantedData();
        const data = await response.json();

        if (data.error) {
            resultBox.innerHTML = `
                <div class="weather-response-box subtitle">
                    ${data.error || "Impossibile caricare la scheda FBI."}
                </div>
            `;
            return;
        }

        const imageMarkup = data.image
            ? `<img class="wanted-image" src="${data.image}" alt="${data.title}">`
            : "";

        const subjectsMarkup = Array.isArray(data.subjects) && data.subjects.length
            ? `<p class="wanted-meta"><strong>Subjects:</strong> ${data.subjects.join(", ")}</p>`
            : "";

        const linkMarkup = data.url
            ? `<p class="wanted-meta"><a class="wanted-link" href="${data.url}" target="_blank" rel="noopener noreferrer">Apri scheda FBI</a></p>`
            : "";

        resultBox.innerHTML = `
            <div class="wanted-card">
                ${imageMarkup}
                <div class="wanted-content">
                    <h3 class="wanted-title">${data.title}</h3>
                    <p class="wanted-description">${data.description || "Nessuna descrizione disponibile."}</p>
                    ${subjectsMarkup}
                    <p class="wanted-meta"><strong>Reward:</strong> ${data.reward || "N/A"}</p>
                    ${linkMarkup}
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error loading wanted card:", error);
        resultBox.innerHTML = `
            <div class="weather-response-box subtitle">
                Impossibile contattare il servizio FBI.
            </div>
        `;
    }
}

document.getElementById("refresh-wanted")?.addEventListener("click", loadWantedCard);
loadWantedCard();
