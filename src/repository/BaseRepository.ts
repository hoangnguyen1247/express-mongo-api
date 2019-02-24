export interface IBaseRepository {

    findMany(page, size): Promise<any>;

    findOneById(id): Promise<any>;

    insert(entity): Promise<any>;

    update(entity): Promise<any>;

    delete(entity): Promise<any>;

    deleteById(id): Promise<any>;
}

export abstract class BaseRepository<T> implements IBaseRepository {

    protected _baseRepository;

    protected constructor(baseRepository) {
        this._baseRepository = baseRepository;
    }

    findMany = async (page: number, size: number) => {
        return await this._baseRepository.findAndCount({
            skip: page * size,
            take: size,
            order: {lastModifiedDate: "DESC"},
        });
    };

    findOneById = async (id: number) => {
        return await this._baseRepository.findOne(id);
    };

    insert = async (entity: T) => {
        return await this._baseRepository.save(entity);
    };

    update = async (entity: T) => {
        return await this._baseRepository.save(entity);
    };

    delete = async (entity: T) => {
        return await this._baseRepository.remove(entity);
    };

    deleteById = async(id: number) => {
        const entity = await this._baseRepository.findOne(id);

        if (entity) {
            return await this._baseRepository.remove(entity);
        }
    };
}

export abstract class MongoBaseRepository implements IBaseRepository {

    protected _mongoBaseRepository;

    protected constructor(mongoBaseRepository) {
        this._mongoBaseRepository = mongoBaseRepository;
    }

    findMany = async(page, size) => {
        return [];
    };

    findOneById = async(id) => {
        return null;
    };

    insert = async(entity) => {
        return null;
    };

    update = async(entity) => {
        return false;
    };

    delete = async(entity) => {
        return false;
    };

    deleteById = async(id) => {
        return false;
    };
}
