import { IsNotEmpty, IsNumber, IsString, MaxLength, max } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
