import { IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3, { message: "Cat have short name" })
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    displayName?: string;

    @IsNotEmpty()
    @IsString()
    @IsLowercase()
    @IsOptional()
    roleName?: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
