import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';

@Controller('/api/book-appointments')
export class BookAppointmentsController {
    constructor(private readonly bookAppointmentsService: BookAppointmentsService) { }

    @Post()
    create(@Body() createBookAppointmentDto: CreateBookAppointmentDto) {
        return this.bookAppointmentsService.create(createBookAppointmentDto);
    }

    @Get()
    findAll(
        @Query('perPage') perPage: number,
        @Query('page') page: number,
        @Query('order') order: string,
        @Query('orderBy') orderBy: string,
        @Query('search') search: string) {
        return this.bookAppointmentsService.findAll({ where: {}, orderBy: { [orderBy]: order }, perPage, page });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookAppointmentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookAppointmentDto: UpdateBookAppointmentDto) {
        return this.bookAppointmentsService.update(+id, updateBookAppointmentDto);
    }
    @Post(':id/status')
    updateStatus(@Param('id') id: string, @Body() updateStatusBookAppointmentDto: UpdateStatusBookAppointmentDto) {
        return this.bookAppointmentsService.updateStatus(+id, updateStatusBookAppointmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookAppointmentsService.remove(+id);
    }
}
