import { getRepository } from "typeorm";

import { BaseRepository, IBaseRepository } from "./BaseRepository";
import { AuditLog } from "../entity/AuditLog";

export interface IAuditLogRepository extends IBaseRepository {

}

export class AuditLogRepository extends BaseRepository<AuditLog> implements IAuditLogRepository {

    constructor() {
        super(getRepository(AuditLog));
    }
}
