import { PartialType } from '@nestjs/mapped-types';
import { CreateBookAppointmentDto } from './create-book-appointment.dto';

export class UpdateBookAppointmentDto extends PartialType(CreateBookAppointmentDto) {}
