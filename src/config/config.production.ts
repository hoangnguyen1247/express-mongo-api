import { configCommon } from './config.common';

export const config = {
    server: configCommon.server,
    corsOptions: configCommon.corsOptions,
    swaggerConfig: {
        swaggerDefinition: configCommon.swaggerConfig.swaggerDefinition,
        apis: configCommon.swaggerConfig.apis,
    },
    database: {
        mongodb: {
            config: configCommon.database.mongodb.config,
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
