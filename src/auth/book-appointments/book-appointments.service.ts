import { Injectable } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';
import { MailService } from 'src/mail/mail.service';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BookAppointmentsService {
    constructor(private prisma: PrismaService,
        private mailService: MailService,
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
        if (status == 'Confirmed') {
            this.mailService.sendMailToClientBookAppoiontmentConfirmed(data)
        } else {
            this.mailService.sendMailToClientBookAppoiontmentCanceled(data)
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
