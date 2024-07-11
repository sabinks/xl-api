import { Module } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { BookAppointmentsController } from './book-appointments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports: [PrismaModule],
    controllers: [BookAppointmentsController],
    providers: [BookAppointmentsService, MailService],
})
export class BookAppointmentsModule { }
