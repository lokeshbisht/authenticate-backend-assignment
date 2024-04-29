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

module.exports = { User, Contact };


return res.status(200).json({
    message: "Auth Succe",
    token: token
})