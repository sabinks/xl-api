import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CreateBookAppointmentDto } from "./create-book-appointment.dto";

export class UpdateBookAppointmentDto extends PartialType(CreateBookAppointmentDto) {
    @IsString()
    status: string;
}
