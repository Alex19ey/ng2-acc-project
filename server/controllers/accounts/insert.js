"use strict";

let lodash = require('lodash');

let db = require('../../utils/lowdb');



const accountFields = require('./constants.json').fields;

exports.mdl = function (req, res, next) {
    let accounts = db.get('accounts');

    let lastId = accounts.maxBy('id').value();
    let newId = (lastId && lastId.id + 1) || 1;

    let body = lodash.pick(req.body, accountFields);
    body.id = newId;

    let account = accounts
        .push(body)
        .last()
        .value();

    db.write()
        .then(() => res.send(account))
        .catch(err => next(err));
};
