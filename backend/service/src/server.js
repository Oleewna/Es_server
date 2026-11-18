//il suo unico compito quando il sistema è strutturato bene è:

const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");//non richiede installazione perche presente di default
require("dotenv").config(); //da aggiungere per il .nev
// importazione delle routes
const pagesRoutes = require("./routes/pageroutes");//gestita come libreria per le routes dei get
const authRoutes = require("./routes/auth");//gestita come libreria per le routes dei post del login
const weatherRoutes = require("./routes/weather");

const app = express();
const port = Number(process.env.PORT) || 3000;

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../../frontend/public"))); //devo dichiarare dove stanno i file statici

app.get("/api/v1/wanted/today", async (req, res) => {
    try {
        const response = await fetch("http://localhost:3002/api/wanted/today");
        const body = await response.text();

        res.status(response.status);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.send(body);
    } catch (error) {
        console.error("FBI wanted service unavailable:", error);
        res.status(502).json({ error: "Impossibile contattare il servizio FBI." });
    }
});

app.get("/api/v1/components/:component", (req, res) => {
    const allowedComponents = new Set(["navbar.html", "footer.html"]);
    if (!allowedComponents.has(req.params.component)) {
        return res.status(404).json({ error: "Componente non trovato" });
    }

    res.sendFile(path.join(__dirname, "../../../frontend/public/components", req.params.component));
});

async function forwardToMongoService(req, res, path, method = "GET", body) {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`http://localhost:3003${path}`, options);
        const responseText = await response.text();

        res.status(response.status);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.send(responseText);
    } catch (error) {
        console.error("Mongo service unavailable:", error);
        res.status(502).json({ error: true, message: "Impossibile contattare il servizio MongoDB." });
    }
}

app.get("/api/v1/db/weather", (req, res) => forwardToMongoService(req, res, "/api/db/weather"));
app.post("/api/v1/db/weather", (req, res) => forwardToMongoService(req, res, "/api/db/weather", "POST", req.body));
app.get("/api/v1/db/users", (req, res) => forwardToMongoService(req, res, "/api/db/users"));
app.post("/api/v1/db/users", (req, res) => forwardToMongoService(req, res, "/api/db/users", "POST", req.body));

app.get("/api/v1/data", async (req, res) => {
    try {
        const response = await fetch("http://localhost:3004/api/data");
        const body = await response.text();

        res.status(response.status);
        res.set("Content-Type", "application/json; charset=utf-8");
        res.send(body);
    } catch (error) {
        console.error("Persistence service unavailable:", error);
        res.status(502).json({ error: "Impossibile contattare il servizio di persistenza." });
    }
});

//gestione delle routes
app.use("/", pagesRoutes);
app.use("/", authRoutes);
app.use("/", weatherRoutes);
app.use("/api/v1", weatherRoutes);
app.use("/api/v1", authRoutes);

const server = app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});

server.on("error", (error) => {
    if (error && error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Please stop the other process or choose a different PORT.`);
    } else {
        console.error("Server startup failed:", error);
    }
    process.exit(1);
});