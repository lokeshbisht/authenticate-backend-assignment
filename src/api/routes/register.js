const express = require('express');
const { User } = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  try {
    const user = await User.create({ name, phoneNumber, email, password });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
