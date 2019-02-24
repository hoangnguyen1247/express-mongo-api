
export interface IRepositoryService {

    findMany(page?, size?): Promise<any>;

    findOneById(id): Promise<any>;

    insert(entity): Promise<any>;

    update(id, entity): Promise<any>;

    delete(id): Promise<any>;
}

export class BaseService {

}