const express = require('express');
const router = express.Router();

const ForecastIo = require('forecastio');
let weather = new ForecastIo("4d87487caf22b134cf1cfbcd01ebc49a");

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/latitude/:latitude/longitude/:longitude', (req, res, next) => {

    if (!req.params.latitude || !req.params.longitude) {
        res.status(404).render("404");
        return;
    }

    let latitude = parseInt(req.params.latitude, 10);
    let longitude = parseInt(req.params.longitude, 10);

    weather.forecast(latitude, longitude, lang = 'es', (err, data) => {
        if (err) {
            next();
            return;
        }
        res.json({
            temperature: data.currently.temperature,
            timezone: data.timezone
        });
    });
});

module.exports = router;