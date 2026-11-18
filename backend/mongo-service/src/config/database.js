const mongoose = require("mongoose");

async function connectToMongoDB() {
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB già connesso.");
        return mongoose;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connessione a MongoDB riuscita!");
        return mongoose;
    } catch (error) {
        console.error("Errore di connessione a MongoDB:", error);
        throw error;
    }
}

module.exports = { connectToMongoDB };
