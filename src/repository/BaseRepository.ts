import * as createError from "http-errors";

export interface IBaseRepository {

    findMany(page, size): Promise<any>;

    findOneById(id): Promise<any>;

    insert(entity): Promise<any>;

    update(id, entity): Promise<any>;

    delete(entity): Promise<any>;
}
