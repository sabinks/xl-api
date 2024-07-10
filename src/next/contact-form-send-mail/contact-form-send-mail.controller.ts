import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactFormSendMailService } from './contact-form-send-mail.service';
import { CreateContactFormSendMailDto } from './dto/create-contact-form-send-mail.dto';

@Controller('api/next/contact-form-send-mail')
export class ContactFormSendMailController {
    constructor(private readonly contactFormSendMailService: ContactFormSendMailService) { }

    @Post()
    sendMail(@Body() createContactFormSendMailDto: CreateContactFormSendMailDto) {
        return this.contactFormSendMailService.sendMail(createContactFormSendMailDto);
    }
}
