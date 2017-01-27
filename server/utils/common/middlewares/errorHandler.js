"use strict";

exports.mdl = function (err, req, res, next) {
    console.error(err);

    res.status(500).send('Unknown error');
};
