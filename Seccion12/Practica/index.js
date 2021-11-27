const express = require('express')
const app = express()
var path = require('path');
var bodyParser = require('body-parser');
var Pusher = require("pusher");

// ================
// PUSHER
// ================

const pusher = new Pusher({
    appId: "1114888",
    key: "d72ba781bbec4de31616",
    secret: "3944fae8f2d2345dafb2",
    cluster: "us2",
    useTLS: true
});
// ================
// Body parser
// ================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ================
// Indico que proviene de la carpeta 'public'
// ================
app.use(express.static(path.join(__dirname, 'public')));
// Trigger: Dispara el mensaje


app.post('/comment', function(req, res) {
    console.log(req.body);
    var newMessage = {
        name: req.body.name,
        message: req.body.message
    }
    pusher.trigger('my-channel', 'my-event', newMessage);
    res.send({ created: true });
})

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(3000)