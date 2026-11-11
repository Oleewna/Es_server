async function loadWelcomeGif() {
    try {
        const response = await fetch("/api/v1/auth/me");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const user = await response.json();
        if (!user.authenticated) {
            return;
        }

        const welcomeContent = document.getElementById("welcome-content");
        if (!welcomeContent) {
            return;
        }

        const box = document.createElement("div");
        box.className = "welcome-box";

        const img = document.createElement("img");
        img.src = "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif";
        img.alt = "Welcome Gif";
        box.appendChild(img);
        welcomeContent.appendChild(box);

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Data";
        button.className = "data-button";
        button.addEventListener("click", async () => {
            try {
                const dataResponse = await fetch("/api/v1/data");
                if (!dataResponse.ok) {
                    throw new Error(`HTTP ${dataResponse.status}`);
                }

                const data = await dataResponse.json();
                const resultNode = document.getElementById("data-result");
                if (resultNode) {
                    resultNode.remove();
                }

                const result = document.createElement("pre");
                result.id = "data-result";
                result.textContent = JSON.stringify(data, null, 2);
                welcomeContent.appendChild(result);
            } catch (error) {
                console.error("Errore nel recupero dei dati:", error);
                const resultNode = document.getElementById("data-result");
                if (resultNode) {
                    resultNode.remove();
                }

                const result = document.createElement("p");
                result.id = "data-result";
                result.textContent = "Errore nel recupero dei dati";
                welcomeContent.appendChild(result);
            }
        });

        welcomeContent.appendChild(button);
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("DOMContentLoaded", loadWelcomeGif);