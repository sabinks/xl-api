import { Injectable } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BookAppointmentsService {
    constructor(private prisma: PrismaService) { }

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
        console.log(bookAppointment);
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
        console.log(bookAppointment);

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
