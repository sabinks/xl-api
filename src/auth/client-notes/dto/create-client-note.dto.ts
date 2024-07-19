import { IsEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateClientNoteDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    note: string
}
