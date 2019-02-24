import * as redis from "redis";
import * as bluebird from "bluebird";

import {config} from "../config";

import {BaseService} from "./BaseService";

export class RedisService extends BaseService {

    private _redisClient;

    constructor() {
        super();

        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);

        this._redisClient = redis.createClient(config.redis.port, config.redis.host);

        this._redisClient.on("error", (error) => {
            // console.log("Redis error: " + error);
        });
    }

    findOneByKey = async(key) => {
        try {
            const result = await this._redisClient.getAsync(key);

            return {
                status: 200,
                data: result,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: error,
            };
        }
    };

    insert = async(key, value) => {
        try {
            const result = this._redisClient.set(key, value);

            return {
                status: 200,
                data: result,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: error,
            };
        }
    };
}
