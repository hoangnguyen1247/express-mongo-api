import * as moment from "moment";

export function newDate() {
    return moment().utc().toDate();
};

export function parseDate() {

};

export function formatDate(date, format = "YYYY/MM/DD h:mm") {
    const _format = format ? format : "YYYY/MM/DD h:mm";
    return moment(date).format(_format);
};

export function toLocal(date) {
    return date.local();
};
