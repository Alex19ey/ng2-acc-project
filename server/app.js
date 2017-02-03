"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let compression = require('compression');
let cors = require('cors');
let path = require('path');

let config = require('../config').server;
let router = require('./routes');
let createServer = require('./utils/createServer');

let app;
exports.app = app = express();



app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
app.disable('x-powered-by');

// app.use(cors());
app.use(compression());

if (config.serveStatic.active) { // serve static files by node
    app.use(config.serveStatic.urlPath, express.static(path.resolve(__dirname, '../frontend/dist'), {
        index: false,
        fallthrough: false,
        maxAge: '30d'
    }));
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

createServer(app, config);
