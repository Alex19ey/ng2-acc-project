"use strict";

let lodash = require('lodash');

let db = require('../../utils/lowdb');


const accountFields = require('./constants.json').fields;

exports.mdl = function (req, res, next) {
    let id = +req.params.id;
    if (!id) return next({s: 400, m: 'id must be a number'});

    let body = lodash.pick(req.body, accountFields);

    let account = db.get('accounts')
        .find({ id: id })
        .assign(body)
        .value();

    if (!account) return next({s: 404});

    db.write()
        .then(() => res.send(account))
        .catch(err => next(err));
};
