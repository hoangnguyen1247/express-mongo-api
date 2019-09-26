import { isObject } from "../utils/TypeUtils";

import { ISetting, settingSchema, SETTING_SUMMARY_COLUMNS } from "../entity/Setting";
import { ISettingRepository } from "../abstract/repository/ISettingRepository";
import { SettingConnector } from './SettingConnector';
import { BaseRepository } from "./BaseRepository";

export class SettingRepository extends BaseRepository<ISetting> implements ISettingRepository {

    constructor(settingsConnector: SettingConnector) {
        super(settingsConnector.getConnection().model("Setting", settingSchema, "setting")); // Model name, Schema, Collect name
    }

    search = async(searchKey, searchFields, filterMap, page, size, sortMap, resType) => {
        const query = this._baseModel.find();
        const countQuery = this._baseModel.countDocuments();

        //
        // Select
        const allowResTypes = ["list"];
        const resTypeMap = {
            list: SETTING_SUMMARY_COLUMNS,
        }
        const selectFields = allowResTypes.includes(resType) ? resTypeMap[resType] : resTypeMap["list"];
        if (Array.isArray(selectFields) && selectFields.length > 0) {
            query.select(selectFields.reduce((accumulator, element, index) => 
                index === 0 ? (accumulator + element) : (accumulator + " " + element), ''));
        }

        //
        // Search
        if (searchKey && Array.isArray(searchFields) && searchFields.length > 0) {
            query.where({
                $or: [
                    ...searchFields.map(item => { return { [item]: searchKey } }),
                ],
            });
            countQuery.where({
                $or: [
                    ...searchFields.map(item => { return { [item]: searchKey } }),
                ],
            });
        }

        //
        // Filter
        const allowFilterCols = [
            "createdDate",
            "type",
            "name",
        ];
        if (isObject(filterMap) && Object.keys(filterMap).length > 0) {
            Object.keys(filterMap)
                .filter(fItem => allowFilterCols.indexOf(fItem) > -1)
                .forEach(mItem => {
                    if (mItem === "name") {
                        query.where({ [mItem]: { "$regex": filterMap[mItem], "$options": "i" } });
                        countQuery.where({ [mItem]: { "$regex": filterMap[mItem], "$options": "i" } });
                    } else {
                        query.where({ [mItem]: filterMap[mItem] });
                        countQuery.where({ [mItem]: filterMap[mItem] });
                    }
                });
        }

        //
        // Sort
        const allowSortColumns = [
            "createdDate",
        ];
        if (isObject(sortMap) && Object.keys(sortMap).length > 0) {
            Object.keys(sortMap)
                .filter(fItem => allowSortColumns.indexOf(fItem) > -1)
                .forEach(mItem => {
                    if (mItem === "createdDate") {
                        query.sort({ createdDate: sortMap[mItem] }); // -1 0 1
                        countQuery.sort({ createdDate: sortMap[mItem] });
                    }
                });
        } else {
            query.sort({ name: -1 });
            countQuery.sort({ name: -1 });
        }

        //
        // Offset, limit
        const parsedPage = parseInt(page, 10);
        const parsedSize = parseInt(size, 10);
        if (parsedPage && parsedSize) {
            query.skip(parsedPage * parsedSize).limit(parsedSize);
        }

        const data = await query.exec();
        const count = await countQuery.exec();

        return [
            data,
            count,
        ];
    };

    findManyByType = async (type, page, size) => {
        const data = await this._baseModel
            .find({ type: type }, {}, {
                skip: page * size,
                limit: parseInt(size, 10),
            });

        const count = await this._baseModel.countDocuments({ type: type });

        return [
            data,
            count,
        ];
    };

    findManyByEntityId = async (entityId, page, size) => {
        const data = await this._baseModel
            .find({ entityId: entityId }, {}, {
                skip: page * size,
                limit: parseInt(size, 10),
            });

        const count = await this._baseModel.countDocuments({});

        return [
            data,
            count,
        ];
    };

    findOne = async(filterMap, resType): Promise<any> => {
        const query = this._baseModel.findOne();

        //
        // Select
        const allowResTypes = ["list"];
        const resTypeMap = {
            list: SETTING_SUMMARY_COLUMNS,
        }
        const selectFields = allowResTypes.includes(resType) ? resTypeMap[resType] : resTypeMap["list"];
        if (Array.isArray(selectFields) && selectFields.length > 0) {
            query.select(selectFields.reduce((accumulator, element, index) => 
                index === 0 ? (accumulator + element) : (accumulator + " " + element), ''));
        }

        //
        // Filter
        const allowFilterCols = [
            "name",
            "createdDate",
        ];
        if (isObject(filterMap) && Object.keys(filterMap).length > 0) {
            Object.keys(filterMap)
                .filter(fItem => allowFilterCols.indexOf(fItem) > -1)
                .forEach(mItem => {
                    if (mItem === "name") {
                        query.where({ [mItem]: { "$regex": filterMap[mItem], "$options": "i" } });
                    } else {
                        query.where({ [mItem]: filterMap[mItem] });
                    }
                });
        }

        return await query.exec();
    };
}
