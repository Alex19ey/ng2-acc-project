"use strict";
const low = require('lowdb');
let path = require('path');
let fs = require('fs');
const fileAsync = require('lowdb/lib/file-async');



const dbFolder = path.normalize(__dirname + './../db');
const dbFileLocation = path.normalize(dbFolder + '/db.json');

// check for db.json file
if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder);
if (!fs.existsSync(dbFileLocation)) fs.closeSync(fs.openSync(dbFileLocation, 'w'));



const db = low(dbFileLocation, {
    storage: fileAsync,
    writeOnChange: false
});

if (!db.has('accounts').value()) db.set('accounts', []).value();


module.exports = db;