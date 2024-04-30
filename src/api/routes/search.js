const express = require('express');
const { searchByName, searchByPhoneNumber } = require('../controllers/searchController');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, phoneNumber } = req.body;
  if (name) {
    return searchByName(req, res);
  } else if (phoneNumber) {
    return searchByPhoneNumber(req, res);
  } else {
    return res.status(400).json({ error: 'Name or phoneNumber is required' });
  }
});

module.exports = router;