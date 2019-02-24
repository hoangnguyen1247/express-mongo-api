import * as format from "string-template";
import { BaseService } from "../BaseService";
import { config } from "../../config";
import { rpPostForm } from "../../utils/ApiCaller";
import { ISmsService } from '../SmsService';
import { createUuidv5 } from '../../utils/UuidUtils';

export class VietGuysService extends BaseService implements ISmsService {

    constructor() {
        super();
    }

    sendVerifyPhoneNumberSms = async(phoneNumber, data, bid) => {
        const _bid = bid || createUuidv5();
        const _sms = config.sms.template.verifyPhoneNumber.template;

        return await this.sendSms(phoneNumber, _sms, _bid);
    };

    sendSms = async (phone, sms, bid) => {
        return await rpPostForm(config.sms.vietguys.apiUrlHttp, {
            u: config.sms.vietguys.user, // user
            pwd: config.sms.vietguys.pass, // password
            from: config.sms.vietguys.from, // brand
            phone: phone, // receiver
            sms: sms, // content
            bid: bid, // generate
        });
    };
}
