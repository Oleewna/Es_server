require("dotenv").config();

module.exports = {
    GATEWAY_PORT: parseInt(process.env.GATEWAY_PORT || "4000", 10),

    SERVICE_URL: process.env.SERVICE_URL || "http://localhost:3000",

    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",

    FBI_SERVICE_URL: process.env.FBI_SERVICE_URL || "http://localhost:3002"
};
