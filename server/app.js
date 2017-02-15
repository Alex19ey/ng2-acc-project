"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = exports.app = express();
const config = require('../config').server;
const router = require('./routes');
const createServer = require('./utils/createServer');



app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
app.disable('x-powered-by');

if (config.trustProxy.isEnabled) app.set('trust proxy', config.trustProxy.addresses);
if (config.compression) app.use(compression());

if (config.serveStatic.isEnabled) { // serve static files by node
    app.use(config.serveStatic.urlPath, express.static(path.resolve(__dirname, '../frontend/dist'), {
        index: false,
        fallthrough: false,
        maxAge: '90d'
    }));
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

createServer(app, config);