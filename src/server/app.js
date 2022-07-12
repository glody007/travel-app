var path = require('path')
const express = require('express')
const https = require('https');
const { response } = require('express');
const { searchImages } = require('pixabay-api');
const axios = require('axios')

const dotenv = require('dotenv');
dotenv.config();

const app = express()

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

// Here we are configuring express to use body-parser as middle-ware.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'))

app.get('/api', function (req, res) {
    res.send('This is Go Travel api')
})

app.post('/images', function (req, res) {
    searchImages(process.env.PIXABAY_KEY, req.body.name)
    .then((r) => res.send(r));
})


app.post('/location', function (req, res) {
    axios({
        method: 'get',
        url: encodeURI(`http://api.geonames.org/searchJSON?formatted=true&q=${req.body.city}&maxRows=1&lang=en&username=${process.env.USER_NAME}&style=full`),
    })
    .then((r) => {
        res.send(r.data)
    });
})

app.post('/forecast', function (req, res) {
    axios({
        method: 'get',
        url: encodeURI(`http://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.city}&key=${process.env.WEATHERBIT_API}&&hours=48`),
    })
    .then((r) => {
        res.send(r.data)
    });
})

module.exports = app