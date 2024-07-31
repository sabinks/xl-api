import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, ParseFilePipe, HttpStatus, Res, Inject, UseGuards } from '@nestjs/common';
import { BookAppointmentsService } from './book-appointments.service';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import 'multer'
import { FileSizeValidationPipe } from './file-size-validation-pipe/file-size-validation.pipe';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
@Controller('/api/next')
export class BookAppointmentsController {
    constructor(private readonly bookAppointmentService: BookAppointmentsService,
    ) { }

    @Post('book-appointment')
    @UseGuards(ThrottlerGuard)
    @Throttle({ default: { ttl: 60000, limit: 100 } })
    @UsePipes(ValidationPipe)
    create(@Body() createBookAppointmentDto: CreateBookAppointmentDto, @Res() res: Response) {
        this.bookAppointmentService.create(createBookAppointmentDto);
        return res.status(HttpStatus.OK).json({
            'message': 'Appointment Book Successfull!'
        })
    }

    @Get('/check-appointment-availablity')
    checkAppointmentAvailability() {
        return this.bookAppointmentService.checkAppointmentAvailability()
    }

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        // console.log(file);

        this.bookAppointmentService.uploadFile(file)
        // return file
        return {
            status: 200,
            message: 'File Uploaded Successfully'
        }
    }
    @Post('test-message')
    async handleSendMail() {
        await this.bookAppointmentService.handleSendMail()
    }
}
