//LA ROUTE AUTH è quella che si occupa di gestire il post del login

const express = require("express");
const router = express.Router();
const { loginController } = require("../controllers/authController.js"); //importo il file auth controller che sviluppa la logica del login

router.post("/login", loginController);

module.exports = router;