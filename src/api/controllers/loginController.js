const { User } = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { email, phoneNumber, password } = req.body;
  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    } else {
      return res.status(400).json({ error: 'Phone number or email is requried' });
    }

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
        message: "Authentication Successful",
        token: token
    });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: "Error occured while logging in" });
  }
};

module.exports = { loginUser };
