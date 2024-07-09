import { Module } from '@nestjs/common';
import { BookAppointmentService } from './book-appointment.service';
import { BookAppointmentController } from './book-appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [BookAppointmentController],
    providers: [BookAppointmentService],
})
export class BookAppointmentModule { }
