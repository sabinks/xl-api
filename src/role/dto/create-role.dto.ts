import { IsLowercase, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @MinLength(2)
    @IsString()
    @IsLowercase()
    name: string;
}
