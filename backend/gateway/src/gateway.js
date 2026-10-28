const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware"); //definizione reverse proxy
const config = require("../config/env");

const app = express();

app.use(express.static(path.join(__dirname, "../../../frontend/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/public/index.html"));
});

app.get("/api/v1", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/public/index.html"));
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// Proxy verso il service
//quello che si ottiene qui è l'api versioning + endpoint hiding --> convenzione goole, paypall, github microsoft ecc
//significa che l'utente vede e digita per il servizio /api/v1/ (es: /api/v1/weather per accedere al weather service)
//in realta la parte finale è estratta dal servizio proxy per il pathrewrite ed il service vede solo /weather
//significa nascondere gli endpoint all'utente con l'introduzione di eleemnti non facolemnte risalibili
//vanno cambiati anche endpoint della pagina statica nav che ridefinisce i percorsi nascosti e nel file
// weather.js che costituisce il dom js ///// va infine modificato il post togliendo l'action per delegare l'azione di redirect al gateway

/*quindi questi per esempio sono quelli veri del service: http://localhost:3000/signin,
questi quelli mascheratihttp://localhost:4000/api/v1/signin*/

app.use("/api/v1/auth", createProxyMiddleware({
    target: config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/auth": ""
    }
}));

app.get("/api/v1/wanted/today", async (req, res) => {
    try {
        const response = await fetch(`${config.FBI_SERVICE_URL}/api/wanted/today`);
        const body = await response.text();

        res.status(response.status);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.send(body);
    } catch (error) {
        console.error("FBI wanted service unavailable:", error);
        res.status(502).json({ error: "Impossibile contattare il servizio FBI." });
    }
});

app.use("/api/v1", createProxyMiddleware({ //tutte le richieste api vengono gestite qui
    target: config.SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1": ""
    }
}));

app.listen(config.GATEWAY_PORT, () => {
    console.log(`Gateway attivo su http://localhost:${config.GATEWAY_PORT}/api/v1/`);
});