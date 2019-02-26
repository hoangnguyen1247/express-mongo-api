const ormconfig = {
    "type": "mongodb",
    "host": process.env.NODE_DB_HOST || "localhost",
    "port": process.env.NODE_DB_PORT || 27018,
    "username": process.env.NODE_DB_USER || "expressapi",
    "password": process.env.NODE_DB_PASSWORD || "expressapi123",
    "database": process.env.NODE_DB_NAME ||"express-api",
    "synchronize": false,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts",
        "build/entity/**/*.js"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};

export = ormconfig;
