const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connection is successful")
    }).catch((err) => {
        console.log("Error while connecting to database")
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;