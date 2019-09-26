import { ContainerBuilder, Reference } from 'node-dependency-injection';

import { SettingConnector } from '../repository/SettingConnector';

import { SettingRepository } from '../repository/SettingRepository';

import { RedisService } from "../service/RedisService";
import { KafkaConsumerService } from '../service/kafka/KafkaConsumerService';
import { BunyanLogger } from "../service/log/BunyanLoggerService";

import { SettingService } from '../service/SettingService';

export class DIContainer {

    private _container = new ContainerBuilder();

    createRegister() {
        // Utils
        this._container.register("bunyanLogger", BunyanLogger);

        // Database connector
        this._container.register("settingConnector", SettingConnector);

        // Repositories
        this._container.register("settingRepository", SettingRepository)
            .addArgument(new Reference("settingConnector"));

        // Common Services
        this._container.register("redisService", RedisService);
        this._container.register("kafkaConsumerService", KafkaConsumerService);

        // Services
        this._container.register("settingService", SettingService)
            .addArgument(new Reference("settingRepository"));

        return this._container;
    }
}
