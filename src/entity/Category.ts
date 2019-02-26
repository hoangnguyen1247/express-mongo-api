import { Column, Entity, ObjectIdColumn } from "typeorm";

import { newDate } from '../utils/DatetimeUtils';

@Entity("category")
export class Category {

    @ObjectIdColumn({name: "id", type: "bigint"})
    id: number;

    @Column({name: "name", type: "varchar", length: 32, default: ""})
    name: string;

    @Column({name: "slug", type: "varchar", length: 255, default: ""})
    slug: string;

    @Column({name: "description", type: "varchar", length: 255, default: ""})
    description: string;

    @Column({name: "created_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdDate: Date;

    @Column({name: "created_by", type: "bigint", default: null})
    createdBy: number;

    @Column({name: "last_modified_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    lastModifiedDate: Date;

    @Column({name: "last_modified_by", type: "bigint", default: null})
    lastModifiedBy: number;

    static Parse(dataObj) {
        const _dataObj = dataObj || {};
        const newEntity = new Category();

        newEntity.id = _dataObj.id || 0;
        newEntity.name = _dataObj.name || "";
        newEntity.slug = _dataObj.slug || "";
        newEntity.description = _dataObj.description || "";
        newEntity.createdDate = _dataObj.createdDate || newDate(); // UTC time
        newEntity.createdBy = _dataObj.createdBy || null;
        newEntity.lastModifiedDate = _dataObj.lastModifiedDate || newDate(); // UTC time
        newEntity.lastModifiedBy = _dataObj.lastModifiedBy || null;

        return newEntity;
    }
}