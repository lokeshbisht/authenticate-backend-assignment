const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connection is successful")
    }).catch((err) => {
        console.log("Error while connecting to database")
    });

module.exports = { User, Contact };