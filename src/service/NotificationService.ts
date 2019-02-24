import * as createError from "http-errors";
import { IEmailService } from './EmailService';
import { ISmsService } from './SmsService';

export interface INotificationService {

    verifyEmail(channels, dataObjs): Promise<any>;
}

export class NotificationService implements INotificationService {

    private _emailService: IEmailService;
    private _smsService: ISmsService;

    constructor(emailService, smsService) {

        this._emailService = emailService;
        this._smsService = smsService;
    }

    verifyEmail = async(channels, dataObjs) => {
        try {
            let result;
            if (Array.isArray(dataObjs) && dataObjs.length > 0) {
                dataObjs.forEach(async (item) => {
                    result = await this._emailService.sendVerifyEmailEmail(item.email, item.token);
                })
            }

            return {
                data: {
                    code: 200,
                    result: result,
                },
            };
        } catch(error) {
            return { error: createError(500, error) };
        }
    };
}
