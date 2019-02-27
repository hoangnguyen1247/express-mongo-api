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
        const title = req.body.title || "";
        const slug = req.body.slug || "";
        const content = req.body.content || "";
        const categoryId = req.body.categoryId || null;
        const featuredImageUrl = req.body.featuredImageUrl || "";

        const user = req.query.user;

        if (!title && !content) {
            return next(createError(400));
        }
        // if (!user) return next(createError(401));

        const { error, data } = await this._postLogService.insert({
            // writerId: user.id,
            // writer: {
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     fullName: user.fullName,
            // },
            category: { 
                id: categoryId,
            },
            title: title,
            slug: slug || slug(title),
            content: content,
            approvedContent: "",
            featuredImageUrl,
            // createdBy: user.id,
            // lastModifiedBy: user.id,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const title = req.body.title;
        const slug = req.body.slug;
        const categoryId = req.body.categoryId || null;
        const content = req.body.content;
        const featuredImageUrl = req.body.featuredImageUrl;

        const user = req.query.user;

        if (!title && !content) {
            return next(createError(400));
        }
        if (!user) return next(createError(401));

        const { error, data } = await this._postLogService.update(id, {
            category: { 
                id: categoryId,
            },
            title,
            slug,
            content,
            featuredImageUrl,
            lastModifiedBy: user.id,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;

        const user = req.query.user;

        if (!id) {
            return next(createError(400));
        }
        if (!user) return next(createError(401));

        const { error, data } = await this._postLogService.delete(id);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };
}
