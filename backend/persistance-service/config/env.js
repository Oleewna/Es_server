require("dotenv").config();

module.exports = {
    PERSISTENCE_PORT: parseInt(process.env.PERSISTENCE_PORT || "3003", 10),
};
