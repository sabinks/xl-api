import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createRegisterDto: CreateRegisterDto) {
        return this.registerService.create(createRegisterDto);
    }
}
