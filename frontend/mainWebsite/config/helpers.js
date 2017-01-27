"use strict";


const path = require('path');


const ROOT = path.resolve(__dirname, '..');
const rootJoin = path.join.bind(path, ROOT);
const EVENT = process.env.npm_lifecycle_event || '';


function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

exports.hasNpmFlag = hasNpmFlag;
exports.rootJoin = rootJoin;
