const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const twit = require('twit');
const Twit = require('twit')
    // Credenciales para tweeter de CRDevelopment - @CRDevelopment1
const T = new Twit({
    consumer_key: 'fsykY9Qpn3l5j8OZAnnPnfjNZ',
    consumer_secret: 'BEyEhF1goU6Cv1k6tW0KKOFkc6mjTWTlNNSB7thhvPhPYCasVR',
    access_token: '1335601674115821576-5UOhELb3H4tG0a0LtcNGU5pNt1vLki',
    access_token_secret: 'tBIECMj8gjliaolixJrm1YPDufMaXDeNglfC1VYWeUaAf',

    // consumer_key: 'fsykY9Qpn3l5j8OZAnnPnfjNZ',
    // consumer_secret: 'BEyEhF1goU6Cv1k6tW0KKOFkc6mjTWTlNNSB7thhvPhPYCasVR',
    // app_only_auth: true,
    // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    // strictSSL: true, // optional - requires SSL certificates to be valid.
})


// Para evitar el problema de 'peticion bloqueada por CORS'
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


console.log('Entra en app');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log('Entra en app 1');

app.get('/tweets/:search', function(req, res) {
    console.log('Entra en get');
    T.get('search/tweets', { q: req.params.search, count: 5 },
        function(err, data, response) {
            console.log('data es : ', data)
            res.json(data);
            console.log('data 1 es : ', data)
        })

    // console.log(req.params.search);
    // res.json({ 'status': 'Success' });
})

app.post('/comment/', function(req, res) {
    console.log('Entra en post comment');
    console.log(req.body.comment);
    T.post('statuses/update', {
        status: req.body.comment
    }, function(err, data, response) {
        res.json(data)
    })
})

app.get('/comment/', function(req, res) {
    console.log(req.body.comment);
    T.post('statuses/update', { status: req.body.comment },
        function(err, data, response) {
            res.json(data)
        })
})

console.log('RESTART');
app.listen(3000)