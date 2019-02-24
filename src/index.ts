import "reflect-metadata";
if (process.env.NODE_ENV === "local") {
    require('ts-node').register();
}
import { createConnection } from "typeorm";
import * as express from "express";
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

import { 
    MongoConnectionOptions
} from "typeorm/driver/mongodb/MongoConnectionOptions";

import { 
    errorHandler, 
    createNotFoundError,
} from "./controller/error/ErrorHandler";

import { DIContainer } from "./di/DIContainer";

import { IndexRouter } from "./route/IndexRouter";
import { NotifierRouter } from "./route/NotifierRouter";

import { config } from "./config";

createConnection(config.database.mongodb.config as MongoConnectionOptions)
    .then(async connection => {
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
            callback(user === 'username' && pass === 'Bookw3b@12345');
        })), swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        app.use("/notifications", NotifierRouter(diContainer));

        // catch 404 and forward to error handler
        app.use(createNotFoundError);

        // error handler
        app.use(errorHandler);

        // start express server
        app.listen(config.server.port);

        console.log(`Express server has started on port ${config.server.port}.`);
    })
    .catch(error => {
        console.log(error)
    });
