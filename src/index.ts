import "reflect-metadata";
if (process.env.NODE_ENV === "local") {
    require('ts-node').register();
}
import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from 'cors';
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import * as rfs from 'rotating-file-stream';
import * as StatusMonitor from "express-status-monitor";
import * as auth from 'http-auth';
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import * as format from "string-template";

import { errorHandler, createNotFoundError } from "./controller/error/ErrorHandler";

import { DIContainer } from "./di/DIContainer";

import { IndexRouter } from "./route/IndexRouter";
import { PostLogRouter } from "./route/PostLogRoute";
import { NotifierRouter } from "./route/NotifierRouter";

import { config } from "./config";

const mongooseConnectionString = format(`mongodb://{username}:{password}@{host}:{port}/{database}`, {
    username: config.database.mongodb.config.username,
    password: config.database.mongodb.config.password,
    host: config.database.mongodb.config.host,
    port: config.database.mongodb.config.port,
    database: config.database.mongodb.config.database,
});

mongoose.connect(mongooseConnectionString, 
    (error) => {
        if (error) {
            console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
            throw error;
        }

        // create express app
        const app = express();
        const diContainer = (new DIContainer()).createRegister();
        const kafkaConsumerService = diContainer.get("kafkaConsumerService");

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());

        const statusMonitor = StatusMonitor({ path: '' });
        app.use(statusMonitor.middleware);

        const logDirectory = path.resolve(__dirname, "..", 'log');
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        const accessLogStream = rfs('access.log', {
            interval: '1d',
            path: logDirectory
        });
        app.use(morgan('combined', { stream: accessLogStream }));

        app.use(cors(config.corsOptions));

        app.use(express.static(path.resolve(__dirname, '..', 'public')));

        app.use("/", IndexRouter(diContainer));

        const options = config.swaggerConfig;
        const swaggerSpec = swaggerJSDoc(options);
        app.use('/swagger', auth.connect(auth.basic({ realm: 'Swagger Area' }, (user, pass, callback) => {
            callback(user === 'expressapi' && pass === 'expressapi123');
        })), swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        app.use("/logs", PostLogRouter(diContainer));
        app.use("/notifications", NotifierRouter(diContainer));

        // catch 404 and forward to error handler
        app.use(createNotFoundError);

        // error handler
        app.use(errorHandler);

        // start express server
        app.listen(config.server.port, () => {
            console.log(`Express server has started on port ${config.server.port}.`);
        });
    })
    .catch(error => {
        console.log(error)
    });
