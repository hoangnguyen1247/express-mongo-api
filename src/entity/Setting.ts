import * as mongoose from 'mongoose';

export interface ISetting extends mongoose.Document {
    name                : string;
    type                : string;
    value               : mongoose.Schema.Types.Mixed;
    addonValue          : mongoose.Schema.Types.Mixed;
    active              : boolean;
    label               : string;
    createdDate         : Date;
    createdBy           : number;
    lastModifiedDate    : Date;
    lastModifiedBy      : number;
}

export const settingSchema = new mongoose.Schema({
    name:               { type: 'String', required: true },
    type:               { type: 'String', required: false },
    value:              { type: mongoose.Schema.Types.Mixed, required: true },
    addonValue:         { type: mongoose.Schema.Types.Mixed, required: false },
    active:             { type: 'Boolean', default: true },
    label:              { type: 'String' },
    createdDate:        { type: 'Date', default: Date.now, required: true },
    createdBy:          { type: 'Number', required: true },
    lastModifiedDate:   { type: 'Date', default: Date.now, required: true },
    lastModifiedBy:     { type: 'Number', required: true },
});

settingSchema.pre("save", () => {

});

export const SETTING_SUMMARY_COLUMNS = [
    "name",
    "type",
    "value",
    "addonValue",
    "active",
    "label",
    "createdDate",
];
