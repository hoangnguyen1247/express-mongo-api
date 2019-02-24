import { IEmailService } from '../EmailService';

import { config } from "../../config";
const nodemailer = require("nodemailer");

export class GmailService implements IEmailService {

    sendVerifyEmailEmail = async (receiverEmail) => {
        const emailConfig = config.email.gmail;
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            // host: emailConfig.host,
            // port: emailConfig.port,
            // secure: false, // true for 465, false for other ports
            service: "gmail",
            auth: {
                user: emailConfig["username"],
                pass: emailConfig["password"],
            },
        });

        // this.createBirthdayEmail("birthday", content)
        //     .then((res) => {
        //         // setup email data with unicode symbols
        //         let mailOptions = {
        //             from: emailConfig["from"], // sender address
        //             to: receiver, // getMany of receivers
        //             subject: subject, // Subject line
        //             text: res, // plain text body
        //             html: res, // html body
        //             attachments: [
        //                 {
        //                     file: "file name",
        //                     path: "log/access.log",
        //                 },
        //             ],
        //         };

        //         // send mail with defined transport object
        //         transporter.sendMail(mailOptions, (error, info) => {
        //             if (error) {
        //                 return console.log(error);
        //             }
        //         });
        //     });
        // // })
    }
}
