"use strict";

let path = require('path');
let renderStaticFile = require('./renderStaticFile');
const websiteRoot = path.normalize(__dirname + './../../../frontend/');


module.exports = {
    index: renderStaticFile(websiteRoot + 'dist/index.html')
};
