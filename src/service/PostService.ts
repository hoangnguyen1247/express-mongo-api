import * as createError from "http-errors";
import * as objectAssign from "object-assign";

import { newDate } from "../utils/DatetimeUtils";

import { Post } from "../entity/Post";
import { PostStatusType } from "../enum/PostStatusType";
import { IPostRepository } from "../repository/PostRepository";
import { ICategoryRepository } from '../repository/CategoryRepository';
import { BaseService, IRepositoryService } from "./BaseService";
import { IFacebookService } from "./FacebookService";

export interface IPostService extends IRepositoryService {

    findOneBySlug(slug): Promise<any>;

    findByUserId(userId, page?, size?): Promise<any>;

    findByCategorySlug(categorySlug, page?, size?): Promise<any>;

    searchAndFilter(searchKey, searchFields, filters, page, size): Promise<any>;

    countByCategoryId(searchKey, searchFields, filters, page, size): Promise<any>;

    updateStatusByCategoryId(categoryId, newStatus): Promise<any>;
}

export class PostService extends BaseService implements IPostService {

    private _postRepository: IPostRepository;
    private _categoryRepository: ICategoryRepository;

    constructor(postRepository, categoryRepository) {
        super();

        this._postRepository = postRepository;
        this._categoryRepository = categoryRepository;
    }

    /**
     * Posts getMany
     */
    findMany = async (page, size) => {
        try {
            const result = await this._postRepository.findMany(page, size);

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
                entityInDb = await this._postRepository.findOneBySlug(id);
            } else {
                entityInDb = await this._postRepository.findOneById(id);
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
            const newPost = await this._postRepository.insert(Post.Parse(objectAssign({}, post, {
                status: PostStatusType.Completed,
            })));

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
            const entityInDb = await this._postRepository.findOneById(id);

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

            await this._postRepository.update(entityInDb);

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
            const entityInDb = await this._postRepository.findOneById(id);

            if (!entityInDb) {
                return { error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) };
            }

            await this._postRepository.delete(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    findOneBySlug = async (slug) => {
        try {
            const post = await this._postRepository.findOneBySlug(slug);

            if (!post) return { error: createError(404) };

            return {
                data: {
                    code: 200,
                    post: post,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    findByUserId = async (userId, page = 0, size = 12) => {
        try {
            const result = await this._postRepository.findByUserId(userId, page, size);

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

    findByCategorySlug = async (categorySlug, page = 0, size = 12) => {
        try {
            const categoryInDb = await this._categoryRepository.findOneBySlug(categorySlug);
            const result = await this._postRepository.findByCategoryId(categoryInDb.id, page, size);

            return {
                data: {
                    code: 200,
                    data: result[0],
                    totalItems: result[1],
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    searchAndFilter = async (searchKey, searchFields, filters, page, size) => {
        try {
            const result = await this._postRepository.searchAndFilter(searchKey, searchFields, filters, page, size);

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

    countByCategoryId = async (searchKey, searchFields, filters, page, size) => {
        try {
            const data = await this._postRepository.countByCategoryId(searchKey, searchFields, filters, page, size);

            return {
                data: {
                    code: 200,
                    data: data,
                },
            };
        } catch (error) {
            return { error: createError(500, error) };
        }
    };

    updateStatusByCategoryId = async (categoryId, newStatus) => {
        try {
            await this._postRepository.updateStatusByCategoryId(categoryId, newStatus);

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
