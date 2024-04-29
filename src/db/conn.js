const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connect('mongodb://localhost:27017/database_name')
    .then(() => {
        console.log("Connection is successful")
    }).catch((err) => {
        console.log("Error while connecting to database")
    });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String },
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = { User, Contact };
