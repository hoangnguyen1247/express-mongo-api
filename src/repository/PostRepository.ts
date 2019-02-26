import { Brackets, getMongoRepository } from "typeorm";

import { Post } from "../entity/Post";
import { BaseRepository, IBaseRepository } from "./BaseRepository";

export interface IPostRepository extends IBaseRepository {

    findOneBySlug(slug): Promise<any>;

    findByUserId(userId, page, size): Promise<any>;

    findByCategoryId(categoryId, page, size): Promise<any>;

    searchAndFilter(searchKey, searchFields, filters, page, size): Promise<any>;

    countByCategoryId(searchKey, searchFields, filters, page, size): Promise<any>;

    updateStatusByCategoryId(categoryId, newStatus): Promise<any>;
}

export class PostRepository extends BaseRepository<Post> implements IPostRepository {

    constructor() {
        super(getMongoRepository(Post))
    }

    findOneBySlug = async (slug) => {
        return await this._baseRepository
            .createQueryBuilder("post")
            .where("post.slug = :slug", { slug: slug })
            .getOne();
    };

    findByUserId = async (userId, page, size) => {
        return await this._baseRepository.findAndCount({
            where: { userId: userId },
            order: { lastModifiedDate: "DESC" },
            skip: page * size,
            take: size,
        });
    };

    findByCategoryId = async (categoryId, page, size) => {
        return await this._baseRepository.findAndCount({
            where: { categoryId: categoryId },
            order: { lastModifiedDate: "DESC" },
            skip: page * size,
            take: size,
        });
    };

    searchAndFilter = async (searchKey, searchFields, filters, page, size) => {
        const query = this._baseRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.category", "category")            
            .where("1 = 1");
        const countQuery = this._baseRepository
            .createQueryBuilder("post")
            .select("COUNT(post.id)", "count")
            .leftJoin("post.category", "category")
            .where("1 = 1");

        // search
        if (searchKey) {
            query.andWhere(new Brackets(qb => {
                qb.where("0 = 1");

                if (searchFields.indexOf("categoryName") > -1) {
                    qb.orWhere(`category.name LIKE :categoryName`, {categoryName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("fullName") > -1) {
                    qb.orWhere(`post.customerFullName LIKE :fullName`, {fullName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("phoneNumber") > -1) {
                    qb.orWhere(`post.customerPhoneNumber LIKE :phoneNumber`, {phoneNumber: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("email") > -1) {
                    qb.orWhere(`post.customerEmail LIKE :email`, {email: '%' + searchKey + '%'});
                }
            }));
            countQuery.andWhere(new Brackets(qb => {
                qb.where("0 = 1");

                if (searchFields.indexOf("categoryName") > -1) {
                    qb.orWhere(`category.name LIKE :categoryName`, {categoryName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("fullName") > -1) {
                    qb.orWhere(`post.customerFullName LIKE :fullName`, {fullName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("phoneNumber") > -1) {
                    qb.orWhere(`post.customerPhoneNumber LIKE :phoneNumber`, {phoneNumber: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("email") > -1) {
                    qb.orWhere(`post.customerEmail LIKE :email`, {email: '%' + searchKey + '%'});
                }
            }));
        }

        // filters
        if (filters.status) {
            query.andWhere(`post.status = :status`, {status: filters.status || ""});
            countQuery.andWhere(`post.status = :status`, {status: filters.status || ""});
        }
        if (filters.tag) {
            query.andWhere(`JSON_CONTAINS(post.tags, '${filters.tag}')`);
            countQuery.andWhere(`JSON_CONTAINS(post.tags, '${filters.tag}')`);
        }
        if (filters.label) {
            query.andWhere(`post.label = :label`, {label: filters.label || ""});
            countQuery.andWhere(`post.label = :label`, {label: filters.label || ""});
        }
        if (filters.pickupById) {
            query.andWhere(`post.pickupById = :pickupById`, {pickupById: filters.pickupById || ""});
            countQuery.andWhere(`post.pickupById = :pickupById`, {pickupById: filters.pickupById || ""});
        }
        if (filters.inventoryId) {
            query.andWhere(`post.inventoryId = :inventoryId`, {inventoryId: filters.inventoryId || ""});
            countQuery.andWhere(`post.inventoryId = :inventoryId`, {inventoryId: filters.inventoryId || ""});
        }
        if (filters.createdDate) {
            query.andWhere(`DATE(post.createdDate) = :createdDate`, {createdDate: filters.createdDate || ""});
            countQuery.andWhere(`DATE(post.createdDate) = :createdDate`, {createdDate: filters.createdDate || ""});
        }
        if (filters.fromDate && filters.toDate) {
            query.andWhere(`DATE(post.createdDate) BETWEEN :fromDate AND :toDate`, {fromDate: filters.fromDate || "", toDate: filters.toDate || ""});
            countQuery.andWhere(`DATE(post.createdDate) BETWEEN :fromDate AND :toDate`, {fromDate: filters.fromDate || "", toDate: filters.toDate || ""});
        }
            
        const data = await query
            .orderBy("post.createdDate", "DESC")
            .offset(page * size)
            .limit(size)
            .getMany();

        const count = await countQuery
            .getRawOne();

        return [
            data,
            count ? count.count : 0,
        ];
    };

    countByCategoryId = async (searchKey, searchFields, filters, page, size) => {
        const query = this._baseRepository
            .createQueryBuilder("post")
            .select("category.id", "categoryId")
            .addSelect("post.title", "postTitle")
            .addSelect("COUNT(post.id)", "postCount")
            .leftJoin("post.category", "category")
            .where("1 = 1");

        // search
        if (searchKey) {
            query.andWhere(new Brackets(qb => {
                qb.where("0 = 1");
                // if (searchFields.indexOf("categoryName") > -1) {
                //     qb.orWhere(`category.name LIKE :categoryName`, {categoryName: '%' + searchKey + '%'});
                // }
                if (searchFields.indexOf("fullName") > -1) {
                    qb.orWhere(`post.customerFullName LIKE :fullName`, {fullName: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("phoneNumber") > -1) {
                    qb.orWhere(`post.customerPhoneNumber LIKE :phoneNumber`, {phoneNumber: '%' + searchKey + '%'});
                }
                if (searchFields.indexOf("email") > -1) {
                    qb.orWhere(`post.customerEmail LIKE :email`, {email: '%' + searchKey + '%'});
                }
            }));
        }

        // filters
        if (filters.status) {
            query.andWhere(`post.status = :status`, {status: filters.status || ""});
        }
        if (filters.tag) {
            query.andWhere(`JSON_CONTAINS(post.tags, '${filters.tag}')`);
        }
        if (filters.label) {
            query.andWhere(`post.label = :label`, {label: filters.label || ""});
        }
        if (filters.pickupById) {
            query.andWhere(`post.pickupById = :pickupById`, {pickupById: filters.pickupById || ""});
        }
        if (filters.inventoryId) {
            query.andWhere(`post.inventoryId = :inventoryId`, {inventoryId: filters.inventoryId || ""});
        }
        if (filters.createdDate) {
            query.andWhere(`DATE(post.createdDate) = :createdDate`, {createdDate: filters.createdDate || ""});
        }
        if (filters.fromDate && filters.toDate) {
            query.andWhere(`DATE(post.createdDate) BETWEEN :fromDate AND :toDate`, {fromDate: filters.fromDate || "", toDate: filters.toDate || ""});
        }

        query.groupBy("categoryId");
        query.addGroupBy("postTitle");
            
        // order & offset, limit
        return await query
            .getRawMany();
    };

    updateStatusByCategoryId = async (categoryId, newStatus) => {
        return await this._baseRepository
            .createQueryBuilder("post")
            .update()
            .set({"post.status": newStatus})
            .where("post.category_id = :categoryId", { categoryId: categoryId })
            .execute();
    };
}
