import { Module } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { BookAppointmentsController } from './book-appointments.controller';

@Module({
  controllers: [BookAppointmentsController],
  providers: [BookAppointmentsService],
})
export class BookAppointmentsModule {}
