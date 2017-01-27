"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let compression = require('compression');
let cors = require('cors');

let config = require('./config');
let router = require('./server/routes');

let app = module.exports = express();

app.use(cors());
app.use(compression());

app.use(express.static(__dirname + '/frontend/mainWebsite/dist', {
    index: false,
    maxAge: '30d'
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/server/view');

app.use(router);

let server = app.listen(config.server.port, config.server.host, function () {
    console.log(`Web server is available at ${config.server.baseURL}`);
});
