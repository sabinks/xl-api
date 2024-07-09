import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBookAppointmentDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @IsEmail()
    @IsLowercase()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    dob: string;

    @IsNotEmpty()
    @IsString()
    bookingDate: string;

    @IsNotEmpty()
    @IsString()
    bookingTime: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
