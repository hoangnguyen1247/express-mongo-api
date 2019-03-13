import * as createError from "http-errors";
import * as objectAssign from "object-assign";

import { newDate } from "../utils/DatetimeUtils";

import { PostLogModel } from "../entity/PostLog";
import { PostStatusType } from "../enum/PostStatusType";
import { IPostLogRepository } from '../repository/PostLogRepository';
import { BaseService, IRepositoryService } from "./BaseService";

export interface IPostLogService extends IRepositoryService {

}

export class PostLogService extends BaseService implements IPostLogService {

    private _postLogRepository: IPostLogRepository;

    constructor(postLogRepository) {
        super();

        this._postLogRepository = postLogRepository;
    }

    /**
     * Posts getMany
     */
    findMany = async (page, size) => {
        try {
            const result = await this._postLogRepository.findMany(page, size);

            return {
                data: {
                    code: 200,
                    posts: result[0],
                    totalItems: result[1],
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    /**
     * Posts getOneByid
     */
    findOneById = async (id) => {
        try {
            let entityInDb;
            if (isNaN(id)) {
                entityInDb = await this._postLogRepository.findOneBySlug(id);
            } else {
                entityInDb = await this._postLogRepository.findOneById(id);
            }

            if (!entityInDb) return { 
                error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) 
            };

            return {
                data: {
                    code: 200,                    
                    post: entityInDb,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    /**
     * Posts insert
     */
    insert = async (post) => {
        try {
            const newPost = await this._postLogRepository.insert(post);

            return {
                data: {
                    code: 201,
                    post: newPost,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    /**
     * Posts update
     */
    update = async (id, post) => {
        try {
            const entityInDb = await this._postLogRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) };
            }

            entityInDb.title = post.title;
            entityInDb.slug = post.slug;
            entityInDb.category = post.category;
            entityInDb.content = post.content;
            entityInDb.featuredImageUrl = post.featuredImageUrl;
            entityInDb.lastModifiedDate = newDate();
            entityInDb.lastModifiedBy = post.lastModifiedBy;

            await this._postLogRepository.update(entityInDb.id, entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    /**
     * Posts delete
     */
    delete = async (id) => {
        try {
            const entityInDb = await this._postLogRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) };
            }

            await this._postLogRepository.delete(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };
}
