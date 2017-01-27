"use strict";

let router = require('express').Router();
let apiRouter = require('./api');
let staticRouter = require('./static');



router.use('/api', apiRouter);
router.use(staticRouter);



module.exports = router;