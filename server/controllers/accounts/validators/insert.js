"use strict";

const validator = require('./../../../utils/common/middlewares/revalidator').validator;


const schema = {
    properties: {
        accountName: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        address: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        phone: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        fax: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        city: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        info: {
            type: 'string',
            required: true,
            allowEmpty: false
        },
        contactName: {
            type: 'string',
            required: true,
            allowEmpty: false
        }
    }
};

exports.schema = schema;
exports.mdl = validator(schema);