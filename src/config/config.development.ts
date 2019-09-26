import * as objectAssign from "object-assign";

import { configCommon } from './config.common';

export const config = {
    server: objectAssign({}, configCommon.server, {
        port: 4201,
    }),
    database: {
        expressSetting: {
            config: objectAssign({}, configCommon.database.expressSetting.config, {
                "synchronize": true,
            }),
        },
    },
    redis: configCommon.redis,
};
