import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [PrismaModule,
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
    controllers: [ForgotPasswordController],
    providers: [ForgotPasswordService, MailService],
})
export class ForgotPasswordModule { }
