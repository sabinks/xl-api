import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { log } from 'handlebars';
import { CreateContactFormSendMailDto } from 'src/next/contact-form-send-mail/dto/create-contact-form-send-mail.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async contactFormSendAdmin(data: CreateContactFormSendMailDto) {
        console.log(data);

        const { email, name, phone, subject, message } = data
        await this.mailerService.sendMail({
            to: process.env.ADMIN_EMAIL,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Contact Form Submission',
            template: './contact-form', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                email, name, phone, subject, message
            },
        }).catch(error => console.log(error)
        )

    }
    async resetPasswordMail(data: any) {

        const { email, resetUrl, username } = data
        await this.mailerService.sendMail({
            to: email,
            from: process.env.NO_REPLY,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Reset Password',
            template: './reset-password', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                email, resetUrl, username
            },
        }).catch(error => console.log(error)
        )

    }
    // async sendUserConfirmation(user: User, token: string) {
    //     const url = `example.com/auth/confirm?token=${token}`;

    //     await this.mailerService.sendMail({
    //         to: user.email,
    //         // from: '"Support Team" <support@example.com>', // override default from
    //         subject: 'Welcome to Nice App! Confirm your Email',
    //         template: './confirmation', // `.hbs` extension is appended automatically
    //         context: { // ✏️ filling curly brackets with content
    //             name: user.name,
    //             url,
    //         },
    //     });

    // }
}
