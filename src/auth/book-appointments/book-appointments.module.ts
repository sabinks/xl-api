import { Module } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { BookAppointmentsController } from './book-appointments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [BookAppointmentsController],
    providers: [BookAppointmentsService],
})
export class BookAppointmentsModule { }
