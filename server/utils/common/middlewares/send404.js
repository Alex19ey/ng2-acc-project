"use strict";


exports.mdl = function (req, res, next) {
    next({s: 404, m: 'Not Found'});
};
