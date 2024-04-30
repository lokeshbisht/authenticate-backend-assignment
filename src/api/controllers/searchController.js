const { User } = require('../../models/userModel');
const { Contact } = require('../../models/contactModel');

const searchByName = async (req, res) => {
  const { name } = req.body;
  try {
    const users = await User.find({ name: { $regex: '^' + name, $options: 'i' } })
      .sort({ name: 1 })
      .lean();

    const partialUsers = await User.find({ name: { $regex: name, $options: 'i', $nin: users.map(u => u.name) } })
      .sort({ name: 1 })
      .lean();

    const allUsers = users.concat(partialUsers);

    const result = [];
    for (let user of allUsers) {
      const contact = await Contact.findOne({ phoneNumber: user.phoneNumber });
      const spam = contact ? contact.spam : false;
      result.push({
        name: user.name,
        phoneNumber: user.phoneNumber,
        spam: spam
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const contacts = await Contact.find({ phoneNumber });
    let responseData = [];

    const user = await User.findOne({ phoneNumber });
    if (user) {
      const contact = await Contact.findOne({ phoneNumber: user.phoneNumber });
      const spam = contact ? contact.spam : false;
      responseData.push({
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: req.user && req.user.contacts.includes(user._id) ? user.email : undefined,
        spam: spam
      });
    } else {
      for (let contact of contacts) {
        responseData.push({
          name: contact.name,
          phoneNumber: contact.phoneNumber,
          email: req.user && req.user.contacts.includes(contact._id) ? contact.email : undefined,
          spam: contacts.spam
        });
      }
    }

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { searchByName, searchByPhoneNumber };