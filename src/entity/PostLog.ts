import * as mongoose from 'mongoose';

const postLog = new mongoose.Schema({
    action:             { type: 'String', required: true },
    entity:             { type: 'String', required: true },
    previousState:      { type: 'Object', required: false },
    currentState:       { type: 'Object', required: true },
    createdDate:        { type: 'Date', default: Date.now, required: true },
    createdBy:          { type: 'Number', required: false },
    lastModifiedDate:   { type: 'Date', default: Date.now, required: true },
    lastModifiedBy:     { type: 'Number', required: false },
});

postLog.pre("save", () => {

});

export const PostLogModel = mongoose.model('PostLog', postLog, "post_log");
