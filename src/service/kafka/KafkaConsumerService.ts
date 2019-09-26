import * as kafka from 'kafka-node';

import { IKafkaConsumerService } from '../../abstract/service/kafka/IKafkaConsumerService';
import { BaseService } from "../BaseService";

export class KafkaConsumerService extends BaseService implements IKafkaConsumerService {

    private _consumer;

    constructor() {
        super();

        try {
            const ConsumerGroup = kafka.ConsumerGroup;
            const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
            const offset = new kafka.Offset(client);
            const options = {
                groupId: "kafka-consumer-group",
                kafkaHost: 'localhost:9092',
                host: 'localhost:2181',
            };
            
            this._consumer = new ConsumerGroup(options, [
                "verify-email",
            ]);

            this._consumer.on('message', (message) => {
                this.handleOnMessage(message);
            });
            
            this._consumer.on('error', (error) => {
                console.log('error', error);
            });
        } catch(error) {
            console.log("Kafka connect error: " + error);
        }
    }

    handleOnMessage = async (message) => {
        const topic = message.topic;
        const key = message.key;
        const value = message.value;

        if (topic === "verify-email") {
            this.handleVerifyEmail(value);
        }
    };    

    handleVerifyEmail = async (value) => {
        try {
            const formattedValue = JSON.parse(value);
            // await this._notificationService.verifyEmail(formattedValue.channels, formattedValue.dataObjs);
        } catch (error) {
            console.log("Kafka consumer error: " + error);
        }
    };
}
