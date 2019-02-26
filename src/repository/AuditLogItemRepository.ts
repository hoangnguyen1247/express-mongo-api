import { getMongoRepository } from "typeorm";

import { BaseRepository, IBaseRepository } from "./BaseRepository";
import { AuditLogItem } from "../entity/AuditLogItem";

export interface IAuditLogItemRepository extends IBaseRepository {

}

export class AuditLogItemRepository extends BaseRepository<AuditLogItem> implements IAuditLogItemRepository {

    constructor() {
        super(getMongoRepository(AuditLogItem));
    }
}
