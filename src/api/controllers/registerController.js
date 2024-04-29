const { User } = require('../db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  try {
    if (!name || !phoneNumber) {
      return res.status(400).json({ error: 'Name and phone number are mandatory' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or phone number is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, phoneNumber, email, password: hashedPassword });

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser };
