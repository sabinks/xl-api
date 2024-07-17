import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';
import { Response } from 'express';

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
    findOne(@Param('id') id: string, @Res() res: Response) {
        let appointment = this.bookAppointmentsService.findOne(+id);
        if (appointment) {
            return appointment
        }
        return res.status(HttpStatus.NOT_FOUND).json({
            'message': 'Appointment Not Found!'
        })
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookAppointmentDto: UpdateBookAppointmentDto, @Res() res: Response) {
        this.bookAppointmentsService.update(+id, updateBookAppointmentDto);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Updated!'
        })
    }
    @Post(':id/status')
    updateStatus(@Param('id') id: string, @Body() updateStatusBookAppointmentDto: UpdateStatusBookAppointmentDto, @Res() res: Response) {
        this.bookAppointmentsService.updateStatus(+id, updateStatusBookAppointmentDto);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Status Updated!'
        })
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        this.bookAppointmentsService.remove(+id);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Deleted!'
        })
    }
}
