import ormconfig = require("../ormconfig");

export const configCommon = {
    server: {
        host: "https://api.bookweb.io",
        port: process.env.NODE_SERVER_PORT || 4203,
        webHost: "https://www.bookweb.io",
        debug: true,
    },
    corsOptions: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        exposedHeaders: "Authorization",
        credentials: true,
        optionsSuccessStatus: 200,
    },
    swaggerConfig: {
        swaggerDefinition: {
            info: {
                title: 'RESTful API',
                version: '1.0.0',
                description: 'RESTful API description',
            },
            host: 'api.bookweb.io',
            basePath: '/',
            securityDefinitions: {
                Bearer: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                }
            }
        },
        apis: ['./src/controller/*.ts'],
    },
    database: {
        mongodb: {
            config: ormconfig,
        },
    },
    facebookPage: {
        pageId: '666363636632586258'
    },
    email: {
        gmail: {

        },
        sendgrid: {
            apiKey: "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",
            subscribed_contact_id: "5965763",
            verifyEmail: {
                from: "noreply@bookweb.io",
                fromName: "Bookweb",
                subject: "Please verify your email address",
            },
        },
        mailgun: {
            apiKey: "adc4545a5aa409a009a05fb834ad5598-4836d8f5-4705b5f8",
            domain: "www.bookweb.io",
            verifyEmail: {
                from: "hello@bookweb.io",
                fromName: "Bookweb",
                subject: "Please verify your email address",
            },
        },
    },
    sms: {
        template: {
            verifyPhoneNumber: {
                template: "Please verify your phone number.",
            },
        },
        vietguys: {
            apiUrlHttp: "http://cloudsms.vietguys.biz:8088/api/index.php",
            apiUrlHttps: "http://cloudsms.vietguys.biz:4438/api/index.php",
            user: "username",
            pass: "pass",
            from: "from",
        },
    },
    redis: {
        port: process.env.NODE_REDIS_PORT || 6201,
        host: process.env.NODE_REDIS_HOST || "localhost",
        password: "Bookw3b@12345",
    },
};
