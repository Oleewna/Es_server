// raccolgo qui tutte le routes delle pages, ossia i percorsi utili per gestire l'invio delle pagine statiche
// in altri termini tutti i get saranno raccolti qui

const express = require("express");
const router = express.Router();
const path = require("path");

// get Pagina di Home
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../frontend/public/index.html"));
});

// get Pagina di login
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../frontend/public/login.html"));
});

// get Pagina di about
router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../frontend/public/about.html"));
});

// get Pagina di signin
router.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../frontend/public/signin.html"));
});

// get Pagina di weather
router.get("/weather", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../frontend/public/weather.html"));
});

module.exports = router; 