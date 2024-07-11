import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { log } from 'handlebars';
import { CreateContactFormSendMailDto } from 'src/next/contact-form-send-mail/dto/create-contact-form-send-mail.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async contactFormSendAdmin(data: CreateContactFormSendMailDto) {

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

    async sendMailToClientBookAppoiontmentCreated(data: any) {
        const { adminName, appName, bookingDateTime, adminEmail, clientName } = data
        await this.mailerService.sendMail({
            to: adminEmail,
            from: process.env.NO_REPLY,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Appointment Booked',
            template: './client/book-appointment-created', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                appName, bookingDateTime, clientName
            },
        }).catch(error => console.log(error)
        )
    }
    async sendMailToClientBookAppoiontmentConfirmed(data: any) {
        const { appName, bookingDateTime, clientEmail, clientName } = data
        await this.mailerService.sendMail({
            to: clientEmail,
            from: process.env.NO_REPLY,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Appointment Book Confirmed',
            template: './client/book-appointment-confirmed', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                appName, bookingDateTime, clientName
            },
        }).catch(error => console.log(error)
        )
    }
    async sendMailToClientBookAppoiontmentCanceled(data: any) {
        const { appName, bookingDateTime, clientEmail, clientName } = data
        await this.mailerService.sendMail({
            to: clientEmail,
            from: process.env.NO_REPLY,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Appointment Booked Canceled',
            template: './client/book-appointment-canceled', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                appName, bookingDateTime, clientName
            },
        }).catch(error => console.log(error)
        )
    }
    async sendMailToAdminBookAppoiontmentCreated(data: any) {
        const { name, email, phone, dob, bookingDateTime, description, adminEmail, appName, adminName } = data
        await this.mailerService.sendMail({
            to: adminEmail,
            from: process.env.NO_REPLY,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Client Booked For Appointment',
            template: './admin/book-appointment-created', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name, email, phone, dob, bookingDateTime, description, appName, adminName,
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
