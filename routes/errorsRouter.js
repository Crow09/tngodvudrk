const express = require('express');
const router = express.Router();
const errorsHandler = require('../handlers/errors');

router.get('/notFound', errorsHandler.notFound);

module.exports = router;