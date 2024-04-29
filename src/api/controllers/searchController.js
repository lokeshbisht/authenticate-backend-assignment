// controllers/searchController.js

const { User, Contact } = require('../db');

const searchByName = async (req, res) => {
  const { name } = req.params;
  try {
    const users = await User.find({ name: { $regex: '^' + name, $options: 'i' } })
      .sort({ name: 1 })
      .lean();

    const partialUsers = await User.find({ name: { $regex: name, $options: 'i', $ne: '^' + name } })
      .sort({ name: 1 })
      .lean();

    const allUsers = users.concat(partialUsers);

    res.status(200).json({
      success: true,
      data: allUsers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const contacts = await Contact.find({ phoneNumber });
    let responseData = [];

    const user = await User.findOne({ phoneNumber });
    if (user) {
      responseData.push({
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: req.user && req.user.contacts.includes(user._id) ? user.email : undefined,
      });
    } else {
      for (let contact of contacts) {
        responseData.push({
          name: contact.name,
          phoneNumber: contact.phoneNumber,
          email: req.user && req.user.contacts.includes(contact._id) ? contact.email : undefined,
        });
      }
    }

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { searchByName, searchByPhoneNumber };