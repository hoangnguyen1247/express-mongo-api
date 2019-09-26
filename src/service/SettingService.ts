import * as createError from "http-errors";

import { SettingName, SettingType } from '../enum/SettingType';
import { ISettingRepository } from "../abstract/repository/ISettingRepository";
import { ISettingService } from "../abstract/service/ISettingService";
import { BaseService } from "./BaseService";

export class SettingService extends BaseService implements ISettingService {

    private _settingRepository: ISettingRepository;

    constructor(settingRepository) {
        super();

        this._settingRepository = settingRepository;
    }

    findMany = async (page, size) => {
        try {
            const settingsInDb = await this._settingRepository.findMany(page, size);

            return {
                data: {
                    code: 200,
                    settings: settingsInDb[0],
                    totalItems: settingsInDb[1],
                },
            }
        } catch(error) {
            return { error: createError(500, error) };
        }
    }

    search = async(searchKey, searchFields, filterMap, page, size, sortMap, resType): Promise<any> => {
        try {
            const settingsInDb = await this._settingRepository.search(
                searchKey,
                searchFields,
                filterMap,
                page, 
                size,
                sortMap,
                resType,
            );

            return {
                data: {
                    code: 200,
                    settings: settingsInDb[0],
                    totalItems: settingsInDb[1],
                },
            }
        } catch(error) {
            return { error: createError(500, error) };
        }
    }

    findOneById = async (id) => {
        try {
            const settingInDb = await this._settingRepository.findOneById(id);

            if (!settingInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })}
            }

            return {
                data: {
                    code: 200,
                    setting: settingInDb,
                },
            };
        } catch(error) {
            return { error: createError(500, error) };
        }
    }

    findOne = async (filterMap) => {
        try {
            const settingInDb = await this._settingRepository.findOne(filterMap);

            if (!settingInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entityNotFound" },
                })};
            }

            return {
                data: {
                    code: 200,
                    setting: settingInDb,
                },
            };
        } catch(error) {
            return { error: createError(500, error) };
        }
    }

    insert = async (data) => {
        try {
            const settingInDb = await this._settingRepository.insert(data);

            return {
                data: {
                    code: 200,
                    setting: settingInDb,
                },
            };
        } catch(error) {
            return { error: createError(500, error) };
        }
    }

    update = async (id, data) => {
        try {
            const settingInDb = await this._settingRepository.findOneById(id);

            settingInDb.value = data.value;
            settingInDb.addonValue = data.addonValue;
            settingInDb.lastModifiedBy = data.lastModifiedBy;

            await this._settingRepository.update(id, settingInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch(error) {
            return { error: createError(500, error) };
        }
    }

    delete = async (id) => {
        try {
            const settingInDb = await this._settingRepository.delete(id);

            return {
                data: {
                    code: 200,
                    setting: settingInDb,
                },
            };
        } catch(error) {
            return { error: createError(500, error) };
        }
    }
}
