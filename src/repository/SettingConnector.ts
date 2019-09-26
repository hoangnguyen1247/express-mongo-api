import * as mongoose from "mongoose";
import * as format from "string-template";

import { config } from "../config";

export class SettingConnector {

    private _connection: mongoose.Connection;

    constructor() {
    }

    createConnection = async () => {
        try {
            if (!this._connection) {
                const settingsConnectionConfig = config.database.expressSetting.config;
                this._connection = await mongoose.createConnection(format(`mongodb://{username}:{password}@{host}:{port}/{database}`, {
                    username: settingsConnectionConfig.username,
                    password: settingsConnectionConfig.password,
                    host: settingsConnectionConfig.host,
                    port: settingsConnectionConfig.port,
                    database: settingsConnectionConfig.database,
                }), { useNewUrlParser: true, useUnifiedTopology: true });
            }
        } catch (error) {
            console.error("Setting connection error: " + error);
        }
    }

    getConnection = () => {
        return this._connection;
    }
}
