import { getMongoRepository } from "typeorm";

import { Category } from "../entity/Category";
import { BaseRepository, IBaseRepository } from "./BaseRepository";

export interface ICategoryRepository extends IBaseRepository {

    findOneBySlug(slug): Promise<any>;
}

export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository {

    constructor() {
        super(getMongoRepository(Category));
    }

    findOneBySlug = async (slug) => {
        return await this._baseRepository
            .createQueryBuilder("category")
            .where("category.slug = :slug", { slug: slug })
            .getOne();
    };
}
