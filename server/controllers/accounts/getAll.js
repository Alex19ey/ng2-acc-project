"use strict";

let db = require('../../utils/lowdb');

const DEFAULT_LIMIT = 20;



exports.mdl = function (req, res, next) {
    let query = req.query;

    const limit = query.limit || DEFAULT_LIMIT;
    const offset = query.offset || 0;

    let accounts = db.get('accounts');

    if (query.query) {
        let queryStr = query.query.toLowerCase();
        accounts = accounts.filter(acc => acc.accountName.toLowerCase().includes(queryStr))
    }
    if (query.sort) {
        accounts = accounts.orderBy(query.sort, query.order || 'desc')
    }

    const count = accounts.size().value();
    accounts = accounts.slice(offset, offset + limit);

    res.set('X-Count', count);
    accounts = accounts.value();

    res.send(accounts);
};
