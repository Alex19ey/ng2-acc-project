"use strict";

exports.mdl = function (err, req, res, next) {
    if (err instanceof Error) { // TODO: sending err.message is not secure(we gave to much info)
        return res.status(err.status).send(err.message || '');
    }

    // custom error
    switch (err.s) {
        case 400:
            res.status(err.s).send(err.m || 'Bad Request');
            break;
        case 404:
            res.status(err.s).send(err.m || 'Not Found');
            break;
        default:
            console.error(err);
            res.status(500).send('Unknown error');

    }
};