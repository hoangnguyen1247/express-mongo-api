import ormconfig = require("../ormconfig");

export const configCommon = {
    server: {
        port: 4201,
    },
    database: {
        expressSetting: {
            config: {
                "name": "express-setting",
                "type": "mongodb",
                "host": "localhost",
                "port": 27017,
                "username": "express",
                "password": "express123",
                "database": "express-setting",
            },
        },
    },
    redis: {
        host: "localhost",
        port: 6379,
        password: "express123",
    },
};
