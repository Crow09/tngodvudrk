const express = require('express');
const router = express.Router();
const searchHandler = require('../handlers/search');

router.get('/', searchHandler.post);

module.exports = router;