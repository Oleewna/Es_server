//logica di gestione del post della pagina auth
const fetch = require("node-fetch");

exports.authController = async (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        try {
            await fetch("http://localhost:3003/api/db/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "admin",
                    email: "admin@local.app",
                    source: "local-login"
                })
            });

            return res.send("Login effettuato!");
        } catch (error) {
            console.error("Errore nel salvataggio utente nel database service:", error);
            return res.send("Login effettuato! (database service non disponibile)");
        }
    }

    return res.send(`Credenziali non valide.<br>Username: ${username}<br>Password: ${password}`);
};
