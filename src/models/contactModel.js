const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String },
  phoneNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  spam: { type: Boolean, default: false },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
