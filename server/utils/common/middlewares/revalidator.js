"use strict";

const revalidator = require('revalidator');



function getRequestBody(req) {
    switch (req.method) {
        case 'GET':
            return req.query || {};

        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'DELETE':
            return req.body || {};
    }

    return false;
}

function validator(schema, options) {

    return function (req, res, next) {
        if (!schema) return next();

        let data = getRequestBody(req);
        if (!data) return next({ s: 400, m: `resource does not support ${req.method} requests` });

        try {
            let result = revalidator.validate(data, schema);
            if (result.valid) return next();

            let err = result.errors[0];
            next({ s: 400, m: `${err.property} ${err.message}` });

        } catch (err) { next(err); }

    }
}


exports.validator = validator;

