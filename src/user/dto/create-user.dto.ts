import { IsLowercase, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
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
}
