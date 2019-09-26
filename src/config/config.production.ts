import { configCommon } from './config.common';

export const config = {
    server: configCommon.server,
    database: {
        expressSetting: {
            config: configCommon.database.expressSetting.config,
        },
    },
    redis: configCommon.redis,
};
