import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, ParseFilePipe, HttpStatus, Res, Inject } from '@nestjs/common';
import { BookAppointmentService } from './book-appointment.service';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import 'multer'
import { FileSizeValidationPipe } from './file-size-validation-pipe/file-size-validation.pipe';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
@Controller('/api/next')
export class BookAppointmentController {
    constructor(private readonly bookAppointmentService: BookAppointmentService,
    ) { }

    @Post('book-appointment')
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
