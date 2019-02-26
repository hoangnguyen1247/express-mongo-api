import * as createError from "http-errors";

import { Category } from '../entity/Category';
import { ICategoryRepository } from "../repository/CategoryRepository";
import { BaseService, IRepositoryService } from "./BaseService";

export interface ICategoryService extends IRepositoryService {

}

export class CategoryService extends BaseService implements ICategoryService {

    private _categoryRepository: ICategoryRepository;

    constructor(categoryRepository) {
        super();

        this._categoryRepository = categoryRepository;
    }

    /**
     * Categorys getMany
     */
    findMany = async(page, size) => {
        try {
            const result = await this._categoryRepository.findMany(page, size);

            return {
                data: {
                    code: 200,
                    categories: result[0],
                    totalItems: result[1],
                },
            };
        } catch (error) {
            return {error: createError(500, error)};
        }
    };

    /**
     * Categorys getOneByid
     */
    findOneById = async(id) => {
        try {
            let entityInDb;
            if (isNaN(id)) {
                entityInDb = await this._categoryRepository.findOneBySlug(id);
            } else {
                entityInDb = await this._categoryRepository.findOneById(id);
            }

            if (!entityInDb) return { 
                error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) 
            };

            return {
                data: {
                    code: 200,
                    category: entityInDb,
                },
            };
        } catch (error) {
            return {error: createError(500, error)};
        }
    };

    /**
     * Categorys insert
     */
    insert = async(category) => {
        try {
            const entityInDb = await this._categoryRepository.insert(Category.Parse(category));

            return {
                data: {
                    code: 201,
                    category: entityInDb,
                },
            };
        } catch (error) {
            return {error: createError(500, error)};
        }
    };

    /**
     * Categorys update
     */
    update = async(id, category) => {
        try {
            const entityInDb = await this._categoryRepository.findOneById(id);

            if (!entityInDb) return { 
                error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) 
            };

            entityInDb.name = category.name;
            entityInDb.slug = category.slug;
            entityInDb.description = category.description;

            await this._categoryRepository.update(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return {error: createError(500, error)};
        }
    };

    /**
     * Categorys delete
     */
    delete = async(id) => {
        try {
            const entityInDb = await this._categoryRepository.findOneById(id);

            if (!entityInDb) return { 
                error: createError(404, "", {
                    error: { errorCode: "entity_not_found" },
                }) 
            };

            await this._categoryRepository.delete(entityInDb);

            return {
                data: {
                    code: 200,
                },
            };
        } catch (error) {
            return {error: createError(500, error)};
        }
    };
}
