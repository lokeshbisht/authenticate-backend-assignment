const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');
const { Contact } = require('../models/contactModel');

mongoose.connect(process.env.DATABASE_URL);

const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Peter', 'Gwen'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Parker', 'Stacy'];

(async () => {
  try {
    for (let i = 0; i < 100; i++) {
      const password = await bcrypt.hash('password123', 10);

      const user = await User.create({
        name: getRandomFullName(firstNames, lastNames),
        phoneNumber: '9' + generatePhoneNumber(),
        password: password,
        email: getRandomEmail(firstNames, lastNames),
        contacts: [],
      });

      const contacts = [];
      for (let j = 0; j < Math.floor(Math.random() * 20) + 1; j++) {
        const contact = await Contact.create({
          name: getRandomFullName(firstNames, lastNames),
          phoneNumber: '9' + generatePhoneNumber(),
          userId: user._id,
          spam: Math.random() < 0.5 ? true : false
        });
        contacts.push(contact);
      }

      user.contacts = contacts;
    }

    console.log('Data populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating data:', error);
    process.exit(1);
  }
})();

function getRandomFullName(firstNames, lastNames) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generatePhoneNumber() {
  const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
  return randomNumber.toString();
}

function getRandomEmail(firstNames, lastNames) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase();
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase();
  return `${firstName}${lastName}@gmail.com`;
}
