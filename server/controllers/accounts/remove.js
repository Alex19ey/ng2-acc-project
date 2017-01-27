"use strict";

let db = require('../../utils/lowdb');



exports.mdl = function (req, res, next) {
    // TODO: should be in separate middleware
    let id = +req.params.id;
    if (!id) return next({s: 400, m: 'id must be a number'});

    let account = db.get('accounts')
        .remove({ id: id })
        .value();

    if (!account) return next({s: 404});

    db.write()
        .then(() => res.send())
        .catch(err => next(err));
};
