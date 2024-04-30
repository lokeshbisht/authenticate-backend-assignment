const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: [true, "Email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
