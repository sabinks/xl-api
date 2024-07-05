import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateRegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    displayName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
