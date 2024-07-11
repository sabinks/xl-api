import { Injectable } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';
import { MailService } from 'src/mail/mail.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BookAppointmentsService {
    constructor(private prisma: PrismaService,
        private mailService: MailService,
        private eventEmitter: EventEmitter2
    ) { }

    create(createBookAppointmentDto: CreateBookAppointmentDto) {
    }

    async findAll({ where, orderBy, page = 1, perPage = 10 }: {
        where?: Prisma.UserWhereInput,
        orderBy?: Prisma.UserOrderByWithRelationInput,
        page?: number,
        perPage?: number
    }) {
        return paginate(
            this.prisma.bookAppointment,
            {
                where,
                orderBy,
            },
            {
                page,
                perPage: perPage
            },
        );
    }

    async findOne(id: number) {
        return await this.prisma.bookAppointment.findFirst({
            where: {
                id: id
            }
        })
    }

    async update(id: number, updateBookAppointmentDto: UpdateBookAppointmentDto) {
        const { name, email, phone, dob, status, bookingDate, bookingTime, } = updateBookAppointmentDto
        let bookAppointment = await this.prisma.bookAppointment.update({
            where: {
                id
            },
            data: {
                name, email, phone, dob, status, bookingDateTime: bookingDate + " " + bookingTime
            }

        })
        return bookAppointment

    }
    async updateStatus(id: number, updateStatusBookAppointmentDto: UpdateStatusBookAppointmentDto) {
        const { status } = updateStatusBookAppointmentDto
        let bookAppointment = await this.prisma.bookAppointment.update({
            where: {
                id
            },
            data: {
                status: status
            }
        })
        const data = {
            clientName: bookAppointment.name,
            clientEmail: bookAppointment.email,
            appName: process.env.APP_NAME,
            bookingDateTime: bookAppointment.bookingDateTime
        }
        switch (status) {
            case 'Confirmed':
                this.eventEmitter.emit('book-appointment.status-confirmed', data)
                break;
            case 'Canceled':
                this.mailService.sendMailToClientBookAppoiontmentCanceled(data)
            // this.eventEmitter.emit('book-appointment.status-canceled', data)
            default:
                break;
        }

        return bookAppointment
    }

    async remove(id: number) {
        return await this.prisma.bookAppointment.delete({
            where: {
                id
            }
        })
    }
}
