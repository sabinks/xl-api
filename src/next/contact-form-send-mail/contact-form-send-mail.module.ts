import { Module } from '@nestjs/common';
import { ContactFormSendMailService } from './contact-form-send-mail.service';
import { ContactFormSendMailController } from './contact-form-send-mail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports: [PrismaModule],
    controllers: [ContactFormSendMailController],
    providers: [ContactFormSendMailService, MailService],
})
export class ContactFormSendMailModule { }
