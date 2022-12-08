import http from 'http';
import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import userRoutes from './routes/user';

const NAMESPACE = 'Server';
const router = express();

/** Connecting to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to MongoDB');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Logging the request */
router.use((req, res, next) => {
    logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
});

/** Parsing the request */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Rules of the API */
/*
router.use((req, res, next) => {
    //https://antdreactts-test.netlify.app/
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});
*/

/** Routes */
router.use('/.netlify/functions/server', bookRoutes);
router.use('/.netlify/functions/server', userRoutes);

/** Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Creating the server */
/*
const httpServer = http.createServer(router);
httpServer.listen( () => {
    logging.info(
        NAMESPACE,
        `Server running on ${config.server.hostname}:${config.server.port}`
    );
});
*/

module.exports.handler = serverless(router);
