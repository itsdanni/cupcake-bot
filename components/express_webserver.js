/**
 * Defines function to configure express app to start server
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('botkit:webserver');

const PORT = process.env.PORT || 3000
    
function startServer () {

    if (!process.env.clientId || !process.env.clientSecret) {
        console.error("no auth variable found!");
    }

    const app = express();
    
    // logging and parsing middleware
	app.use(morgan('dev'));

    // load static resources from public directory
    app.use(express.static(path.join(__dirname, '..', 'public')));
    
    // route all slack events to slack handlers
    app.use('/slack', require('./slack'));

    // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    })

    // error logging
	app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal Server Error.');
    });

    app.listen(PORT, () => console.log('server started on 3000!'))

} 

module.exports = startServer;