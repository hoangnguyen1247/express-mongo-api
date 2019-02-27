import { ContainerBuilder, Reference } from 'node-dependency-injection';

import { RedisService } from "../service/RedisService";
import { SendGridClientService } from '../service/SendGridClientService';
import { VietGuysService } from '../service/sms/VietGuysService';

import { NotificationService } from '../service/NotificationService';
import { BunyanLogger } from "../service/BunyanLoggerService";
import { SendGridService } from '../service/email/SendGridService';
import { KafkaConsumerService } from '../service/KafkaConsumerService';

import { PostLogRepository } from '../repository/PostLogRepository';

import { PostLogService } from '../service/PostLogService';

export class DIContainer {

    private _container = new ContainerBuilder();

    createRegister() {
        // Utils
        this._container.register("bunyanLogger", BunyanLogger);

        // Repositories
        this._container.register("postLogRepository", PostLogRepository);

        // Common Services
        this._container.register("redisService", RedisService);
        this._container.register("emailService", SendGridService);
        this._container.register("smsService", VietGuysService);
        this._container.register("sendGridClientService", SendGridClientService);
        this._container.register("kafkaConsumerService", KafkaConsumerService)
            .addArgument(new Reference("notificationService"));

        // Services
        this._container.register("notificationService", NotificationService)
            .addArgument(new Reference("emailService"))
            .addArgument(new Reference("smsService"));
        this._container.register("postLogService", PostLogService)
            .addArgument(new Reference("postLogRepository"));

        return this._container;
    }
}
