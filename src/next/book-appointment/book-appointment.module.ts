import { Module } from '@nestjs/common';
import { BookAppointmentService } from './book-appointment.service';
import { BookAppointmentController } from './book-appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports: [PrismaModule],
    controllers: [BookAppointmentController],
    providers: [BookAppointmentService, MailService],
})
export class BookAppointmentModule { }
