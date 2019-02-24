import { Column, ObjectIdColumn, ObjectID } from "typeorm";

export class AuditLog {

    @ObjectIdColumn({ name: "id" })
    id: ObjectID;

    @Column({ name: "log_time"})
    logTime: string;

    @Column({ name: "action"})
    action: string;

    @Column({ name: "details"})
    details: string;

    @Column({ name: "created_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @Column({ name: "created_by", type: "bigint", default: null })
    createdBy: number;

    @Column({ name: "last_modified_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    lastModifiedDate: Date;

    @Column({ name: "last_modified_by", type: "bigint", default: null })
    lastModifiedBy: number;
}
