import {CronService} from "../service/CronService";

export async function registerCronTabs() {
    const cronService = new CronService();

    cronService.sendBirthdayMessageJob();
    cronService.sendReminderMessageJob();
}
