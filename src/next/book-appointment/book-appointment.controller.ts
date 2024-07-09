import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { BookAppointmentService } from './book-appointment.service';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';

@Controller('/api/next')
export class BookAppointmentController {
    constructor(private readonly bookAppointmentService: BookAppointmentService) { }

    @Post('book-appointment')
    @UsePipes(ValidationPipe)
    create(@Body() createBookAppointmentDto: CreateBookAppointmentDto) {
        return this.bookAppointmentService.create(createBookAppointmentDto);
    }

    @Get('/check-appointment-availablity')
    checkAppointmentAvailability() {
        return this.bookAppointmentService.checkAppointmentAvailability()
    }
}
