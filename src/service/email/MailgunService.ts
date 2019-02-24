import * as mailgun from 'mailgun-js';
import * as createError from "http-errors";

import { config } from "../../config";
import { BaseService } from "../BaseService";
import { IEmailService } from '../EmailService';

export class MailGundService extends BaseService implements IEmailService {

    private _mailgunClient;

    constructor() {
        super();

        this._mailgunClient = mailgun(config.email.mailgun.apiKey, config.email.mailgun.domain);
    }

    sendVerifyEmailEmail = async (receiverEmail) => {
        try {
            const msg = {
                to: receiverEmail,
                from: config.email.mailgun.verifyEmail.from,
                subject: config.email.mailgun.verifyEmail.subject,
                html: `
                    <div style="width: 800px; margin: 0 auto">
                        <p>Chào bạn.</p>
                        <p>Gửi bạn mã khuyến mãi.</p>
                        <div style="text-align: center;">
                            <button style="width: 250px;">Verify your email</button>
                        </div>
                    </div>
                `,
            };

            this._mailgunClient
                .messages()
                .send(msg, (error, body) => {
                    console.log(body);
                });
        } catch(error) {
            return {error: error};
        }
    };
}
