const { Contact } = require('../../models/contactModel');

const markNumberAsSpam = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    let contact = await Contact.findOne({ phoneNumber });
    if (!contact) {
      contact = await Contact.create({ phoneNumber, spam: true });
    } else {
      contact.spam = true;
      await contact.save();
    }
    res.status(200).json({ message: 'Number marked as spam' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error occured while marking number as spam' });
  }
};

module.exports = { markNumberAsSpam };
