require("dotenv").config();

module.exports = {
    GATEWAY_PORT: parseInt(process.env.GATEWAY_PORT || "4000", 10),

    SERVICE_URL: process.env.SERVICE_URL || "http://localhost:3000",

    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",

    FBI_SERVICE_URL: process.env.FBI_SERVICE_URL || "http://localhost:3002",

<<<<<<< HEAD
    DATABASE_SERVICE_URL: process.env.DATABASE_SERVICE_URL || "http://localhost:3003",
=======
    PERSISTENCE_SERVICE_URL: process.env.PERSISTENCE_SERVICE_URL || "http://localhost:3003",
>>>>>>> 7e583bde0ac5af73691034d39dcf6a0307c15d49

    WANTED_SERVICE_URL: process.env.WANTED_SERVICE_URL || process.env.FBI_SERVICE_URL || "http://localhost:3002"
};
