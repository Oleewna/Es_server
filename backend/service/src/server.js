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
const port = Number(process.env.PORT) || 3001;

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../../frontend/public"))); //devo dichiarare dove stanno i file statici

//gestione delle routes
app.use("/", pagesRoutes);
app.use("/", authRoutes);
app.use("/", weatherRoutes);

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