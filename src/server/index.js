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

const port = process.env.PORT || 8000

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/images', function (req, res) {
    searchImages(process.env.PIXABAY_KEY, 'paris')
    .then((r) => res.send(r));
})


app.get('/location', function (req, res) {
    const city = 'lubumbashi'
    axios({
        method: 'get',
        url: encodeURI(`http://api.geonames.org/searchJSON?formatted=true&q=${city}&maxRows=1&lang=en&username=${process.env.USER_NAME}&style=full`),
    })
    .then((r) => {
        res.send(r.data)
    });
})

app.get('/forecast', function (req, res) {
    const city = 'lubumbashi'
    axios({
        method: 'get',
        url: encodeURI(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${process.env.WEATHERBIT_API}&&hours=48`),
    })
    .then((r) => {
        res.send(r.data)
    });
})