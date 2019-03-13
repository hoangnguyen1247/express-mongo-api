import { NextFunction, Request, Response } from "express";
import * as createError from "http-errors";
import * as slug from "slug";

import { BaseController } from "./BaseController";
import { IPostLogService } from '../service/PostLogService';

export class PostController extends BaseController {

    private _postLogService: IPostLogService;

    constructor(diContainer) {
        super();

        this._postLogService = diContainer.get("postLogService");
    }

    findMany = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page ? req.query.page : 0;
        const size = req.query.size ? req.query.size : 12;

        const { error, data } = await this._postLogService.findMany(page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    findOneById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;

        if (!id) {
            return next(createError(400));
        }

        const { error, data } = await this._postLogService.findOneById(id);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    insert = async (req: Request, res: Response, next: NextFunction) => {
        const action = req.body.action || "";
        const entity = req.body.entity || "";
        const previousState = req.body.previousState || {};
        const currentState = req.body.currentState || {};

        const { error, data } = await this._postLogService.insert({
            action,
            entity,
            previousState,
            currentState,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const action = req.body.action || "";
        const entity = req.body.entity || "";
        const previousState = req.body.previousState || {};
        const currentState = req.body.currentState || {};

        const { error, data } = await this._postLogService.update(id, {
            id,
            action,
            entity,
            previousState,
            currentState,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;

        if (!id) {
            return next(createError(400));
        }

        const { error, data } = await this._postLogService.delete(id);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };
}
