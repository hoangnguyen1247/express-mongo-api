
export interface ISmsService {

    sendVerifyPhoneNumberSms(phone, data, bid?): Promise<any>;
}
