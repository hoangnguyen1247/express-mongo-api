import "reflect-metadata";
if (process.env.NODE_ENV === "local" && process.env.DEBUG === "true") {
    require('ts-node').register();
}
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as favicon from "serve-favicon";
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import * as rfs from 'rotating-file-stream';
import * as StatusMonitor from "express-status-monitor";

import { config } from "./config";

import { errorHandler, createNotFoundError } from "./controller/error/ErrorHandler";

import { DIContainer } from "./di/DIContainer";

import { IndexRouter } from "./route/IndexRouter";
import { SettingRouter } from "./route/SettingRoute";

import { SettingConnector } from "./repository/SettingConnector";

const main = async () => {
    // create express app
    const app = express();
    const diContainer = (new DIContainer()).createRegister();
    const settingConnector = await (diContainer.get("settingConnector") as SettingConnector).createConnection();
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

    app.use("/", IndexRouter(diContainer));

    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    app.use(favicon(path.resolve(__dirname, 'public', 'favicon.ico')));

    app.use("/settings", SettingRouter(diContainer));

    // catch 404 and forward to error handler
    app.use(createNotFoundError);

    // error handler
    app.use(errorHandler);

    // start express server
    app.listen(config.server.port, () => {
        console.log(`Express server has started on port ${config.server.port}.`);
    });
}

main()
    .then(res => {

    })
    .catch(error => {
        console.log(error);
    });
