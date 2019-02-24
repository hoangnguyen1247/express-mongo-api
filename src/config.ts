import {config as configLocal} from "./config/config.local";
import {config as configDevelopment} from "./config/config.development";
import {config as configStaging} from "./config/config.staging";
import {config as configProduction} from "./config/config.production";

let selectedProfile = configLocal;
switch (process.env.NODE_ENV) {
    case "development":
        selectedProfile = configDevelopment;
        break;
    case "staging":
        selectedProfile = configStaging;
        break;
    case "production":
        selectedProfile = configProduction;
        break;
    default:
        selectedProfile = configLocal;
        break;
}

export const config = selectedProfile;
