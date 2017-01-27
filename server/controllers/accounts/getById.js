"use strict";

let db = require('../../utils/lowdb');



exports.mdl = function (req, res, next) {
    let id = +req.params.id;
    if (!id) return next({s: 400, m: 'id must be a number'});

    let account = db.get('accounts')
        .find({ id:  id})
        .value();

    if (!account) return next({s: 404});

    res.send(account);
};
