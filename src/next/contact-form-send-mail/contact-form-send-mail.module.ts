import { Module } from '@nestjs/common';
import { ContactFormSendMailService } from './contact-form-send-mail.service';
import { ContactFormSendMailController } from './contact-form-send-mail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'MAIL_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.NODE_ENV == 'development' ? 'amqp://localhost:5672' : `${process.env.RBMQ_URL}`],
                    queue: 'mail_queue',
                    queueOptions: {
                        durable: false
                    },
                }
            },
        ]),
    ],
    controllers: [ContactFormSendMailController],
    providers: [ContactFormSendMailService],
})
export class ContactFormSendMailModule { }
