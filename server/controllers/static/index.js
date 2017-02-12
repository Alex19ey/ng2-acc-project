"use strict";

const path = require('path');
const renderStaticFile = require('./renderStaticFile');


module.exports = {
    index: renderStaticFile('dist/index.html')
};
