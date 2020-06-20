'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./utils/error-handler');

//Instantiate Express
const app = express();
app.use(bodyParser.json());
app.use(cors()); // enable all CORS requests

//===========================================
// Route Handlers
//===========================================
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res, next){
	res.send('Scalapay Integration API');
});

// global error handler
app.use(errorHandler);

// application routes
app.use('/v2', require('./routes/routes'));

// Error handling
app.use((req, res, next) => {
    const error = new Error('Invalid request!');
    error.status = 404;
    next(error);  
})

// Error handling
app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;