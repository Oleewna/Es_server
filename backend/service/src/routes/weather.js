//LA ROUTE AUweather TH è quella che si occupa di gestire il post del pagina che richiama il servio api weather

const express = require("express");
const router = express.Router();
const { weatherController } = require("../controllers/weatherController");

router.post("/weather", weatherController);

module.exports = router;