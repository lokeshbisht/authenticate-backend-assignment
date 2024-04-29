const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
server.listen(port) ;

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