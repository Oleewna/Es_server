const mongoose = require("mongoose");

const weatherSearchSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    country: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    temperature: {
        type: Number,
        default: 0
    },
    humidity: {
        type: Number,
        default: 0
    },
    wind: {
        type: Number,
        default: 0
    },
    requestedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("WeatherSearch", weatherSearchSchema);
