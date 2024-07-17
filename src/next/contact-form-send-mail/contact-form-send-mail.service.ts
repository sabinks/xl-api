import { Inject, Injectable } from '@nestjs/common';
import { CreateContactFormSendMailDto } from './dto/create-contact-form-send-mail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ContactFormSendMailService {
    constructor(
        @Inject('MAIL_SERVICE') private client: ClientProxy
    ) {
    }

    sendMail(createContactFormSendMailDto: CreateContactFormSendMailDto) {
        // this.mailService.contactFormSendAdmin(createContactFormSendMailDto)
        this.client.emit('contact-form-send-mail', createContactFormSendMailDto)
    }
}
