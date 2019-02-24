import * as objectAssign from "object-assign";

import { configCommon } from './config.common';

export const config = {
    server: objectAssign({}, configCommon.server, {
        host: "http://localhost:4203",
        webHost: "http://dev.bookweb.io",
        port: 4203,
    }),
    corsOptions: configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: objectAssign({}, configCommon.swaggerConfig.swaggerDefinition, {
            "host": "localhost:4203",
        }),
        apis: configCommon.swaggerConfig.apis,
    },
    database: {
        mongodb: {
            config: objectAssign({}, configCommon.database.mongodb.config, {
                "synchronize": true,
                "port": 27018,
            }),
        },
    },
    facebookPage: configCommon.facebookPage,
    email: {
        gmail: configCommon.email.gmail,
        sendgrid: configCommon.email.sendgrid,
        mailgun: configCommon.email.mailgun,
    },
    sms: {
        template: configCommon.sms.template,
        vietguys: configCommon.sms.vietguys, 
    },
    redis: configCommon.redis,
};
