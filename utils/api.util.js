const axios = require('axios');

async function fetchTimeForTimezone(timezone = 'Asia/Kolkata') {
    // using worldtimeapi (no key)
    const url = `http://worldtimeapi.org/api/timezone/${timezone}`;
    const resp = await axios.get(url);
    return resp.data;
}

async function fetchWeatherByCity(city = 'Mumbai') {
    // NOTE: openweathermap requires an API key; here we show a fallback to a free endpoint or you can plug in your key in .env
    if (!process.env.OPEN_WEATHER_KEY) {
        return { error: 'No weather key configured. Set OPEN_WEATHER_KEY in .env to get real data.' };
    }
    const q = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric`;
    const resp = await axios.get(q);
    return resp.data;
}

module.exports = { fetchTimeForTimezone, fetchWeatherByCity };
