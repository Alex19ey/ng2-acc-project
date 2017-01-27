"use strict";

let router = require('express').Router();
let controllers = require('./../controllers');
let common = require('./../utils/common/middlewares');



router.get('/*', controllers.static.index);

router.use(common.errorHandler.mdl);

module.exports = router;