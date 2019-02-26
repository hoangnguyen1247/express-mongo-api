import { Column, Entity, ObjectIdColumn, ManyToOne } from "typeorm";
import { PostStatusType } from "../enum/PostStatusType";

import { newDate } from '../utils/DatetimeUtils';

@Entity("post")
export class Post {

    @ObjectIdColumn({ name: "id", type: "bigint" })
    id: number;

    @Column({ name: "type", type: "varchar", length: 32, default: "" })
    type: string;

    @Column({ name: "category_id", type: "bigint", default: null })
    category: string;

    @Column({ name: "writer_id", type: "bigint", default: null })
    writerId: number;

    @Column({ name: "writer", type: "json" })
    writer: {};

    @Column({ name: "title", type: "varchar", length: 255, default: "" })
    title: string;

    @Column({ name: "slug", type: "varchar", length: 255, default: "" })
    slug: string;

    @Column({ name: "content", type: "text" })
    content: string;

    @Column({ name: "approved_content", type: "text" })
    approvedContent: string;

    @Column({ name: "approved_by_id", type: "bigint", default: 0 })
    approvedById: number;

    @Column({ name: "featured_image_url", type: "varchar", length: 512, default: "" })
    featuredImageUrl: string;

    @Column({ name: "status", type: "varchar", length: 32, default: "" })
    status: PostStatusType;

    @Column({ name: "tags", type: "json" })
    tags: string[];

    @Column({ name: "created_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @Column({ name: "created_by", type: "bigint", default: null })
    createdBy: number;

    @Column({ name: "last_modified_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    lastModifiedDate: Date;

    @Column({ name: "last_modified_by", type: "bigint", default: null })
    lastModifiedBy: number;

    static Parse(dataObj) {
        const _dataObj = dataObj || {};
        const newEntity = new Post();

        newEntity.type = _dataObj.type;
        newEntity.category = _dataObj.category;
        newEntity.writerId = _dataObj.writerId;
        newEntity.writer = _dataObj.writer || {};
        newEntity.title = _dataObj.title;
        newEntity.slug = _dataObj.slug;
        newEntity.content = _dataObj.content;
        newEntity.approvedContent = _dataObj.approvedContent;
        newEntity.approvedById = _dataObj.approvedById;
        newEntity.featuredImageUrl = _dataObj.featuredImageUrl;
        newEntity.status = _dataObj.status;
        newEntity.tags = _dataObj.tags || [];
        newEntity.createdDate = _dataObj.createdDate || newDate(); // UTC time
        newEntity.createdBy = _dataObj.createdBy || null;
        newEntity.lastModifiedDate = _dataObj.lastModifiedDate || newDate(); // UTC time
        newEntity.lastModifiedBy = _dataObj.lastModifiedBy || null;

        return newEntity;
    }
}
