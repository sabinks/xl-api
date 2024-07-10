import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}