export interface IBaseRepository {

    findMany(page, size): Promise<any>;

    search(searchKey?, searchFields?, filterMap?, page?, size?, sortMap?, resType?): Promise<any>;

    findOneById(id): Promise<any>;

    findOne(filterMap, resType?): Promise<any>;

    insert(entity): Promise<any>;

    update(id, entity): Promise<any>;

    delete(entity): Promise<any>;

    insertMany(entities): Promise<any>;
}
