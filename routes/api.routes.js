const express = require('express');
const router = express.Router();
const { fetchTimeForTimezone, fetchWeatherByCity } = require('../utils/api.util');
const auth = require('../middlewares/auth.middleware');

router.get('/time', auth, async (req, res) => {
    try {
        const tz = req.query.tz || 'Asia/Kolkata';
        const data = await fetchTimeForTimezone(tz);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Time API error' });
    }
});

router.get('/weather', auth, async (req, res) => {
    try {
        const city = req.query.city || 'Mumbai';
        const data = await fetchWeatherByCity(city);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Weather API error' });
    }
});

module.exports = router;
