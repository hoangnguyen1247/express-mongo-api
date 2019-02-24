import * as createError from "http-errors";
import { BaseService } from "./BaseService";

export interface IEmailService {

    sendVerifyEmailEmail(toEmail, token): Promise<any>;
}

export class EmailService extends BaseService implements IEmailService {

    sendVerifyEmailEmail = async (toEmail, token) => {
        return { error: createError(501) };
    };
}
