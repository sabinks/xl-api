import { Module } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { BookAppointmentsController } from './book-appointments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { BookAppointmentListener } from './listeners/book-appointment.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule,
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
    controllers: [BookAppointmentsController],
    providers: [BookAppointmentsService, MailService, BookAppointmentListener, JwtService],
    exports: [JwtService]
})
export class BookAppointmentsModule { }
