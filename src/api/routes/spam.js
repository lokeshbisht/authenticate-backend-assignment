const express = require('express');
const { markNumberAsSpam } = require('../controllers/spamController');

const router = express.Router();

router.post('/', markNumberAsSpam);

module.exports = router;
