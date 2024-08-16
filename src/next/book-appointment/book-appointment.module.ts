import { Module } from '@nestjs/common';
import { BookAppointmentService } from './book-appointment.service';
import { BookAppointmentController } from './book-appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { BullModule } from '@nestjs/bull';
import { FileUploadProcess } from './file-upload.process';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        PrismaModule,
        BullModule.registerQueue({
            name: 'fileUpload'
        }),
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
    controllers: [BookAppointmentController],
    providers: [BookAppointmentService, MailService],
})
export class BookAppointmentModule { }
