import * as path from "path";
import * as bunyan from 'bunyan';
import {LoggingBunyan} from '@google-cloud/logging-bunyan';

export class BunyanLogger {

    private _logger;

    constructor() {
        const loggingBunyan = new LoggingBunyan({
            projectId: "bookweb-io",
            keyFilename: path.resolve(__dirname, "..", "..", "bookweb-io-b43d5a8480a5.json"),
        });

        this._logger = bunyan.createLogger({
            name: 'bookweb-io', // for Stackdriver Logging
            streams: [
                {stream: process.stdout, level: 'error'}, // Console
                loggingBunyan.stream('error'), // Stackdriver Logging
            ],
        });
    }

    info = async (value) => {
        this._logger.info(value);
    };

    error = async (value) => {
        this._logger.error(value);
    };
}
