import { PartialType } from '@nestjs/mapped-types';
import { CreateBookAppointmentDto } from './create-book-appointment.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateStatusBookAppointmentDto {
    @IsString()
    status: string;
}
