import {BaseService} from "./BaseService";

const cronJob = require("cron").CronJob;

export class CronService extends BaseService {

    sendBirthdayMessageJob = async() =>{
        const schedule = "";

        const job = new cronJob(schedule, function () {

        }, null, false);

        job.start();
    };

    sendReminderMessageJob = async() =>{
        const schedule = "";

        const job = new cronJob(schedule, function () {

        }, null, false);

        job.start();
    };
}