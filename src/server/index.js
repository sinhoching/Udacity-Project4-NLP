var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const aylien = require("aylien_textapi")
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist'))

console.log(__dirname)

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// You could call it aylienapi, or anything else
console.log(`Your API key is ${process.env.API_KEY}`);
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

/*app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/
app.post('/analyze', async function (req, res) {

    textapi.sentiment({
        'url': req.body.url
    }, function (error, response) {
        res.send(response);
        if (error === null) {
            console.log(response);
        }
    });
})
/*app.post('/analyze', async function (req, res) {
    // 1. Pick url out of data
    console.log(req.body.url);
    console.log("Heys");*/




    // 2. Fetch website text from url
/* fetch(req.body.url)
 .then(res => res.text())
 .then(body => {console.log(body));*/

    // 3, POST text to alien
/*try {
    const data = await getUrl.json();
    console.log(data)
    // 4. return alien output
    res.send({
        "objectivity": 0.6,
        "positivity": 0.93
    });
} catch (error) {
    console.log("error", error);
}

})*/
