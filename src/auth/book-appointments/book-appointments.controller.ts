import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';
import { Response } from 'express';
import { RolesGuard } from '../guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('/api/book-appointments')
export class BookAppointmentsController {
    constructor(private readonly bookAppointmentsService: BookAppointmentsService) { }

    @Post()
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    create(@Body() createBookAppointmentDto: CreateBookAppointmentDto) {
        return this.bookAppointmentsService.create(createBookAppointmentDto);
    }

    @Get()
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    findAll(
        @Query('perPage') perPage: number,
        @Query('page') page: number,
        @Query('order') order: string,
        @Query('orderBy') orderBy: string,
        @Query('search') search: string) {
        return this.bookAppointmentsService.findAll({ where: {}, orderBy: { [orderBy]: order }, perPage, page });
    }

    @Get(':id')
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
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
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    update(@Param('id') id: string, @Body() updateBookAppointmentDto: UpdateBookAppointmentDto, @Res() res: Response) {
        this.bookAppointmentsService.update(+id, updateBookAppointmentDto);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Updated!'
        })
    }
    @Post(':id/status')
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    updateStatus(@Param('id') id: string, @Body() updateStatusBookAppointmentDto: UpdateStatusBookAppointmentDto, @Res() res: Response) {
        this.bookAppointmentsService.updateStatus(+id, updateStatusBookAppointmentDto);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Status Updated!'
        })
    }

    @Delete(':id')
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    remove(@Param('id') id: string, @Res() res: Response) {
        this.bookAppointmentsService.remove(+id);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Deleted!'
        })
    }
}
