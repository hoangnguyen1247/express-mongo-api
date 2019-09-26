export interface IRepositoryService {

    findMany(page?, size?): Promise<any>;

    search(searchKey?, searchFields?, filterMap?, page?, size?, sortMap?, resType?): Promise<any>;

    findOneById(id): Promise<any>;

    findOne(filterMap): Promise<any>;

    insert(entity): Promise<any>;

    update(id, entity): Promise<any>;

    delete(id): Promise<any>;
}
