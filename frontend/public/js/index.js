async function loadWelcomeGif() {
    try {

        const response = await fetch("/api/v1/auth/me");
        if (!response.ok) { throw new Error(`HTTP ${response.status}`); }

        const user = await response.json();
        if (!user.authenticated) {
            return;
        }

        const welcomeContent =
            document.getElementById("welcome-content");
        if (!welcomeContent) {
            return;
        }

        const box =
            document.createElement("div");
        box.className =
            "welcome-box";

        const img =
            document.createElement("img");
        img.src =
            "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif";
        img.alt =
            "Welcome Gif";

        box.appendChild(img);
        welcomeContent.appendChild(box);

    } catch (err) {
        console.error(err);
    }
}

window.addEventListener(
    "DOMContentLoaded",
    loadWelcomeGif
);