import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateStatusBookAppointmentDto } from './dto/update-status-book-appointment.dto';
import { MailService } from 'src/mail/mail.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BookAppointmentsService {
    constructor(private prisma: PrismaService,
        private mailService: MailService,
        private eventEmitter: EventEmitter2,
        @Inject('MAIL_SERVICE') private client: ClientProxy,
        @Inject('STRIPE_CLIENT') private stripe: Stripe
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
                this.client.emit('book-appointment.status-confirmed', data)
                // this.eventEmitter.emit('book-appointment.status-confirmed', data)
                break;
            case 'Cancelled':
                this.client.emit('book-appointment.status-canceled', data)
            // this.eventEmitter.emit('book-appointment.status-canceled', data)
            // this.mailService.sendMailToClientBookAppoiontmentCanceled(data)
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

    async sendPaymentForBookAppointment(id: number) {
        let bookAppointment = await this.prisma.bookAppointment.findFirst({
            where: {
                id
            },
        })
        if (!bookAppointment) {
            throw new NotFoundException('Book appointment not found!')
        }
        let clientId = (await bookAppointment).userId
        let client = await this.prisma.user.findFirst({
            where: {
                id: clientId
            }
        })
        if (!client) {
            throw new NotFoundException('Client information not found!')
        }
        let customer
        if (client && !client?.customerId) {
            customer = await this.stripe.customers.create({
                name: client.username,
                email: client.email
            })
            await this.prisma.user.update({
                where: {
                    id: client.id
                },
                data: {
                    customerId: customer.id
                }
            })
        }
        let customerId = client?.customerId ? client.customerId : customer.id
        this.client.emit('book-appointment-payment', {
            customerId: customerId,
            name: client.username,
            email: client.email,
            amount: 20,
            currency: process.env.STRIPE_CURRENCY,
            appName: process.env.APP_NAME,
            paymentUrl: `${process.env.FRONTEND_URL}/payment?refId=${bookAppointment.id}&cusId=${customerId}&amt=${20}&cur=${process.env.STRIPE_CURRENCY}`
        })
    }
}
