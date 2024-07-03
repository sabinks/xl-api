import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateCatDto {
    @MinLength(3, { message: "Cat have short name" })
    @IsString()
    name: string;

    @MinLength(3, { message: "Chooose cat's color" })
    @IsNotEmpty()
    color: string;
}
