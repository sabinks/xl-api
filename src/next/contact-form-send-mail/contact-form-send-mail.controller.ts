import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ContactFormSendMailService } from './contact-form-send-mail.service';
import { CreateContactFormSendMailDto } from './dto/create-contact-form-send-mail.dto';
import { Response } from 'express';

@Controller('api/next/contact-form-send-mail')
export class ContactFormSendMailController {
    constructor(private readonly contactFormSendMailService: ContactFormSendMailService) { }

    @Post()
    sendMail(@Body() createContactFormSendMailDto: CreateContactFormSendMailDto, @Res() res: Response) {
        this.contactFormSendMailService.sendMail(createContactFormSendMailDto);
        res.status(HttpStatus.OK).json({
            'message': 'Contact form submitted!'
        })
    }
}
