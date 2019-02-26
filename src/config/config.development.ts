import * as objectAssign from "object-assign";

import { configCommon } from './config.common';

export const config = {
    server: objectAssign({}, configCommon.server, {
        host: "https://apidev.bookweb.io",
        port: 4101,
        webHost: "https://dev.bookweb.io",
    }),
    corsOptions: configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: objectAssign({}, configCommon.swaggerConfig.swaggerDefinition, {
            "host": "apidev.bookweb.io",
            "database": "bookweb-notifier-dev",
        }),
        apis: configCommon.swaggerConfig.apis,
    },
    database: {
        mongodb: {
            config: objectAssign({}, configCommon.database.mongodb.config, {
                "synchronize": true,
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
