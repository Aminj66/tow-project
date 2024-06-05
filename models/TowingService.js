const mongoose = require('mongoose');

const TowingServiceSchema = new mongoose.Schema({
    name: String,
    contact: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    availability: String,
});

module.exports = mongoose.model('TowingService', TowingServiceSchema);

