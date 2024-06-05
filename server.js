app.use(express.static('public'));
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tow-project', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Towing Service Schema
const TowingServiceSchema = new mongoose.Schema({
    name: String,
    contact: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    availability: String,
});

const TowingService = mongoose.model('TowingService', TowingServiceSchema);

app.use(bodyParser.json());

// API to get nearby towing services
app.post('/api/nearby', async (req, res) => {
    const { latitude, longitude } = req.body;
    // Implement logic to find nearby services based on location
    const services = await TowingService.find({
        'location.latitude': { $gt: latitude - 0.1, $lt: latitude + 0.1 },
        'location.longitude': { $gt: longitude - 0.1, $lt: longitude + 0.1 },
    });
    res.json(services);
});

// Real-time availability updates
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

