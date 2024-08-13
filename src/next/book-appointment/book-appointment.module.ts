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
                    urls: ['amqp://guest:guest@xl_nestjs_rabbitmq:5672'],
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
