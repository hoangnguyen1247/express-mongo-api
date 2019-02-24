import { Column, ObjectIdColumn, ObjectID } from "typeorm";

import { AuditLog } from './AuditLog';

export class AuditLogItem {

    @ObjectIdColumn({ name: "id" })
    id: ObjectID;

    @Column(type => AuditLog)
    auditLog: AuditLog;

    @Column({ name: "transaction"})
    transaction: string;

    @Column({ name: "table_name"})
    tableName: string;

    @Column({ name: "previous_state"})
    previousState: string;

    @Column({ name: "current_state"})
    currentState: string;

    @Column({ name: "created_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @Column({ name: "created_by", type: "bigint", default: null })
    createdBy: number;

    @Column({ name: "last_modified_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    lastModifiedDate: Date;

    @Column({ name: "last_modified_by", type: "bigint", default: null })
    lastModifiedBy: number;
}
