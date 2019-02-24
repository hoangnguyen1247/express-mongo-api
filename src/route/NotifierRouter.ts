import * as express from "express";

import { NotificationController } from "../controller/NotificationController";
import { SendGridClientController } from '../controller/SendGridClientController';

export function NotifierRouter(diContainer) {
    const router = express.Router();
    const notificationController = new NotificationController(diContainer);
    const sendGridClientController = new SendGridClientController(diContainer);

    router.route("/notifications/verify-email")
        .post(notificationController.verifyEmail);

    router.route("/sendgrid/create-contact-list")
        .post(sendGridClientController.createContactList);
    router.route("/sendgrid/create-recipients")
        .post(sendGridClientController.createRecipients);
    router.route("/sendgrid/add-recipients-to-list/:listId")
        .post(sendGridClientController.addRecipientsToList);
    router.route("/sendgrid/list-recipients-on-list/:listId")
        .get(sendGridClientController.listRecipientsOnList);

    return router;
}
