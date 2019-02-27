import * as mongoose from 'mongoose';

const postLog = new mongoose.Schema({
    name:               { type: 'String', required: true },
    title:              { type: 'String', required: true },
    content:            { type: 'String', required: true },
    slug:               { type: 'String', required: true },
    cuid:               { type: 'String', required: true },
    createdDate:        { type: 'Date', default: Date.now, required: true },
    lastModifiedDate:   { type: 'Date', default: Date.now, required: true },
});

postLog.pre("save", () => {

});

export const PostLogModel = mongoose.model('PostLog', postLog, "post_log");
