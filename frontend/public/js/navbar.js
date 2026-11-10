// Va incluso in ogni pagina al posto dello script inline che faceva fetch
// della navbar:
// nuovo DOM della navbar
async function loadNavbar() {
    const container = document.getElementById("navbar");
    //se la nav non c'è chiudi --> guard clause
    if (!container) return;

    // 1. Inserisce l'HTML della navbar --> caricamento dom
    const html = await (await fetch("/api/v1/components/navbar.html")).text();
    container.innerHTML = html;

    // 2. Chiede al backend chi è loggato
    const authArea = document.getElementById("auth-area");
    const welcomeUser = document.getElementById("welcome-user");

    try {
        const response = await fetch("/api/v1/auth/me"); //endpoint standard google

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const user = await response.json();

        if (user.authenticated) {
            authArea.replaceChildren(); //quando autenticato toglie il contenuto "Login with google"

            if (welcomeUser) {
                // textContent (NON innerHTML): il nome arriva da Google ed è dato esterno,
                // con innerHTML sarebbe una possibile XSS
                welcomeUser.textContent = `Ciao ${user.firstName}`;
            }

            const logout = document.createElement("a");
            logout.href = "/api/v1/auth/logout"; //carico il link logout
            logout.textContent = "Logout";

            authArea.append(logout);
        }
        // se non autenticato resta il link "Login with Google" già presente
    } catch (err) {
        // auth-service giù: la navbar resta in stato "non loggato"
        console.error("Impossibile verificare l'autenticazione:", err);
    }
}

window.addEventListener("DOMContentLoaded", loadNavbar);
