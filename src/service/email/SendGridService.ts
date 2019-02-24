import * as sendGridEmail from "@sendgrid/mail";
import * as createError from "http-errors";

import { config } from "../../config";
import { BaseService } from "../BaseService";
import { IEmailService } from '../EmailService';

export class SendGridService extends BaseService implements IEmailService {

    constructor() {
        super();

        sendGridEmail.setApiKey(config.email.sendgrid.apiKey);
    }

    sendVerifyEmailEmail = async (toEmail, token) => {
        try {
            const verifyEmailConfig = config.email.sendgrid.verifyEmail; 
            const msg = {
                to: toEmail,
                from: verifyEmailConfig.from,
                subject: verifyEmailConfig.subject,
                html: `
                    <div style="width: 800px; margin: 0 auto">
                        <p>Chào bạn.</p>
                        <p>Vui lòng xác nhận email của bạn.</p>
                        <div style="text-align: center;">
                            <a href="${config.server.webHost + "/auth/verify-email?t=" + token}" style="width: 250px;">Xác nhận email của bạn.</a>
                        </div>
                    </div>
                `,
            };

            return await sendGridEmail.send(msg);
        } catch(error) {
            return {error: error};
        }
    };
}
