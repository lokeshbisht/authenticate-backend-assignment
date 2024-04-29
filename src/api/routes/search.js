// routes/search.js

const express = require('express');
const { searchByName, searchByPhoneNumber } = require('../controllers/searchController');

const router = express.Router();

router.get('/name/:name', searchByName);
router.get('/phoneNumber/:phoneNumber', searchByPhoneNumber);

module.exports = router;
