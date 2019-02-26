import { NextFunction, Request, Response } from "express";
import * as createError from "http-errors";
import * as slug from "slug";

import { BaseController } from "./BaseController";
import { IPostService } from '../service/PostService';
import { ICategoryService } from '../service/CategoryService';

export class PostController extends BaseController {

    private _postService: IPostService;
    private _categoryService: ICategoryService;

    constructor(diContainer) {
        super();

        this._postService = diContainer.get("postService");
        this._categoryService = diContainer.get("categoryService");
    }

    findMany = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page ? req.query.page : 0;
        const size = req.query.size ? req.query.size : 12;

        const { error, data } = await this._postService.findMany(page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    findOneById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;

        if (!id) {
            return next(createError(400));
        }

        const { error, data } = await this._postService.findOneById(id);

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
        if (!user) return next(createError(401));

        const { error, data } = await this._postService.insert({
            writerId: user.id,
            writer: {
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.fullName,
            },
            category: { 
                id: categoryId,
            },
            title: title,
            slug: slug || slug(title),
            content: content,
            approvedContent: "",
            featuredImageUrl,
            createdBy: user.id,
            lastModifiedBy: user.id,
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

        const { error, data } = await this._postService.update(id, {
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

        const { error, data } = await this._postService.delete(id);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    findByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        const page = req.query.page || 0;
        const size = req.query.size || 12;

        if (!userId) {
            return next(createError(400));
        }

        const { error, data } = await this._postService.findByUserId(userId, page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    findByCategorySlug = async (req: Request, res: Response, next: NextFunction) => {
        const categorySlug = req.params.slug || "";
        const page = req.query.page || 0;
        const size = req.query.size || 12;

        if (!categorySlug) {
            return next(createError(400));
        }

        const { error, data } = await this._postService.findByCategorySlug(categorySlug, page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    searchAndFilter = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page || 0;
        const size = req.query.size || 12;
        const searchKey = req.query.searchKey || "";
        const searchFields = req.query.searchFields || [];
        const status = req.query.status || "";
        const requestorId = req.query.requestorId || "";
        const inventoryId = req.query.inventoryId || "";
        const tag = req.query.tag || "";
        const createdDate = req.query.createdDate || "";
        const fromDate = req.query.fromDate || "";
        const toDate = req.query.toDate || "";

        const user = req.query.user;

        const filters = {
        };
        if (status) {
            filters["status"] = status;
        }
        if (requestorId) {
            filters["pickupById"] = requestorId;
        }
        if (inventoryId) {
            filters["inventoryId"] = inventoryId;
        }
        if (tag) {
            filters["tag"] = tag;
        }
        if (createdDate) {
            filters["createdDate"] = createdDate;
        }
        if (fromDate) {
            filters["fromDate"] = fromDate;
        }
        if (toDate) {
            filters["toDate"] = toDate;
        }
        const { error, data } = await this._postService.searchAndFilter(searchKey, searchFields, filters, page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    countByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page || 0;
        const size = req.query.size || 12;
        const searchKey = req.query.searchKey || "";
        const searchFields = req.query.searchFields || [];
        const status = req.query.status || "";
        const requestorId = req.query.requestorId || "";
        const inventoryId = req.query.inventoryId || "";
        const tag = req.query.tag || "";
        const createdDate = req.query.createdDate || "";
        const fromDate = req.query.fromDate || "";
        const toDate = req.query.toDate || "";

        const user = req.query.user;

        const filters = {
        };
        if (status) {
            filters["status"] = status;
        }
        if (requestorId) {
            filters["pickupById"] = requestorId;
        }
        if (inventoryId) {
            filters["inventoryId"] = inventoryId;
        }
        if (tag) {
            filters["tag"] = tag;
        }
        if (createdDate) {
            filters["createdDate"] = createdDate;
        }
        if (fromDate) {
            filters["fromDate"] = fromDate;
        }
        if (toDate) {
            filters["toDate"] = toDate;
        }
        const { error, data } = await this._postService.countByCategoryId(searchKey, searchFields, filters, page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    updateStatusByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
        const categoryId = req.body.categoryId;
        const newStatus = req.body.newStatus;

        const user = req.query.user;

        if (!user) { return next(createError(401)) }
        
        const { error, data } = await this._postService.updateStatusByCategoryId(categoryId, newStatus);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    // Categories
    findManyCategories = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page ? req.query.page : 12;
        const size = req.query.size ? req.query.size : 0;

        const user = req.query.user;

        if (!user) return next(createError(401));

        const { error, data } = await this._categoryService.findMany(page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    findOneCategoryById = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;

        const user = req.query.user;

        if (!user) return next(createError(401));
        if (!id) {
            return next(createError(400));
        }

        const { error, data } = await this._categoryService.findOneById(id);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    insertCategory = async (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name || "";
        const slug = req.body.slug || "";
        const description = req.body.description || "";

        const user = req.query.user;

        if (!user) return next(createError(401));
        if (!name) {
            return next(createError(400));
        }

        const { error, data } = await this._categoryService.insert({
            name: name,
            slug: slug || slug(name),
            description: description,
            createdBy: user.id,
            lastModifiedBy: user.id,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;
        const name = req.body.name || "";
        const slug = req.body.slug || "";
        const description = req.body.description || "";

        const user = req.query.user;

        if (!user) return next(createError(401));
        if (!name) {
            return next(createError(400, "", { 
                error: { errorCode: "name_is_required" },
            }));
        }
        if (!slug) {
            return next(createError(400, "", { 
                error: { errorCode: "slug_is_required" },
            }));
        }

        const { error, data } = await this._categoryService.update(id, {
            name,
            slug,
            description,
            lastModifiedBy: user.id,
        });

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    };

    deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id || null;

        const user = req.query.user;

        if (!user) return next(createError(401));
        if (!id) {
            return next(createError(400));
        }

        const { error, data } = await this._categoryService.delete(id);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }
}
