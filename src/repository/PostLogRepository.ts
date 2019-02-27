import { PostLogModel } from "../entity/PostLog";
import { IBaseRepository } from "./BaseRepository";

export interface IPostLogRepository extends IBaseRepository {

    findOneBySlug(slug): Promise<any>;
}

export class PostLogRepository implements IPostLogRepository {

    findMany = async (page, size) => {
        const data = await PostLogModel
            .find({}, {}, {
                skip: page * size,
                limit: parseInt(size, 10),
            });

        const count = await PostLogModel.count({});

        return [
            data,
            count,
        ];
    };

    findOneById = async (id: number) => {
        return await PostLogModel.findById(id);
    };

    insert = async (entity) => {
        return await PostLogModel.create(entity);
    };

    update = async (id, entity) => {
        return await PostLogModel.findByIdAndUpdate(id, entity);
    };

    delete = async (id) => {
        return await PostLogModel.findByIdAndRemove(id);
    };

    findOneBySlug = async (slug) => {
        return await PostLogModel.findOne({ slug: slug });
    };
}
