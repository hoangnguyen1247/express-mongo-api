import { NextFunction, Request, Response } from "express";
import * as createError from "http-errors";

import { ISettingService } from "../abstract/service/ISettingService";

import { BaseController } from "./BaseController";

export class SettingController extends BaseController {

    private _settingService: ISettingService;

    constructor(diContainer) {
        super();

        this._settingService = diContainer.get("settingService");
    }

    /**
     * Find many
     */
    findMany = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page;
        const size = req.query.size;

        const { error, data } = await this._settingService.findMany(page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * Search
     */
    search = async(req: Request, res: Response, next: NextFunction) => {
        const searchKey = req.query.searchKey;
        const searchFields = req.query.searchFields;
        const page = req.query.page;
        const size = req.query.size;
        const responseType = req.query.responseType;
        const type = req.query.type;
        const name = req.query.name;

        const filterMap = {};
        if (type) {
            filterMap["type"] = type;
        }
        if (name) {
            filterMap["name"] = name;
        }

        const sortMap = {};

        const { error, data } = await this._settingService.search(
            searchKey,
            Array.isArray(searchFields) ? searchFields : (typeof searchFields === "string" ? [searchFields] : []),
            filterMap,
            page, 
            size,
            sortMap,
            responseType,
        );

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * Search
     */
    findOne = async(req: Request, res: Response, next: NextFunction) => {
        const name = req.query.name;

        const filterMap = {};
        if (name) {
            filterMap["name"] = name;
        }

        const { error, data } = await this._settingService.findOne(
            filterMap,
        );

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * Find one by id
     */
    findOneById = async (req: Request, res: Response, next: NextFunction) => {
        const settingsId = req.params.id;

        const { error, data } = await this._settingService.findOneById(settingsId);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * Insert
     */
    insert = async (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;
        const value = req.body.value;
        const addonValue = req.body.addonValue;
        const type = req.body.type;
        const label = req.body.label;

        const user = req.query.user;
        if (!user) {
            return next(createError(401));
        }

        const { error, data } = await this._settingService.insert({
            name,
            value,
            addonValue,
            type,
            label,
            createdBy: user ? user.id : null,
            lastModifiedBy: user ? user.id : null,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * Update
     */
    update = async (req: Request, res: Response, next: NextFunction) => {
        const settingsId = req.params.id;
        const name = req.body.name;
        const type = req.body.type;
        const value = req.body.value;
        const addonValue = req.body.addonValue;
        const label = req.body.label;

        const user = req.query.user;
        if (!user) {
            return next(createError(401));
        }

        const { error, data } = await this._settingService.update(settingsId, {
            name,
            type,
            value,
            addonValue,
            label,
            lastModifiedBy: user ? user.id : null,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };
    /**
     * Delete
     */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const settingsId = req.params.id;

        const user = req.query.user;
        if (!user) {
            return next(createError(401));
        }

        const { error, data } = await this._settingService.delete(settingsId);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };
}
