"use strict";

let router = require('express').Router();

let common = require('./../utils/common/middlewares');
let accountsController = require('../controllers').accounts;
let accountsValidators = require('../controllers/accounts/validators');



router.route('/v1/accounts')
    .get(accountsController.getAll.mdl)
    .post(accountsValidators.insert.mdl, accountsController.insert.mdl);

router.route('/v1/accounts/:id')
    .get(accountsController.getById.mdl)
    .patch(accountsController.update.mdl)
    .delete(accountsController.remove.mdl);


router.use('/*', common.send404.mdl);

router.use(common.errorApiHandler.mdl);



module.exports = router;