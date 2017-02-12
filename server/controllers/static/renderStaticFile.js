"use strict";

const path = require('path');

 // TODO: remove 'unsafe-inline' and 'unsafe-eval' from script-src on production
let securityPolicy = 'default-src \'self\'; ' +
    'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; ' +
    'style-src \'self\' \'unsafe-inline\' https://maxcdn.bootstrapcdn.com; ' +
    'font-src \'self\' https://maxcdn.bootstrapcdn.com;';

let options = {
    root: path.join(__dirname, './../../../frontend/'),
    headers: {
        'Content-Security-Policy': securityPolicy
    }
};


module.exports = function (path) {

    return function (req, res, next) {
        res.sendFile(path, options, function (err) {
            if (err) return next(err);
        });
    }
};