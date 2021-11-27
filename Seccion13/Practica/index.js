const express = require('express');
const app = express();
var request = require('request');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(3000)