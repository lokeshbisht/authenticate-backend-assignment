const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
require('dotenv').config();
require('../src/db/conn');

const authenticate = require('./middleware/authenticate');
const registerRoute = require('./api/routes/register');
const loginRoute = require('./api/routes/login');
const searchRoute = require('./api/routes/search');
const spamRoute = require('./api/routes/spam');

const app = express();
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/search', authenticate, searchRoute);
app.use('/spam', authenticate, spamRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;