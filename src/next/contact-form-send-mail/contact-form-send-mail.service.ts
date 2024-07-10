import { Injectable } from '@nestjs/common';
import { CreateContactFormSendMailDto } from './dto/create-contact-form-send-mail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ContactFormSendMailService {
    constructor(private mailService: MailService) { }

    sendMail(createContactFormSendMailDto: CreateContactFormSendMailDto) {
        this.mailService.contactFormSendAdmin(createContactFormSendMailDto)
    }
}
