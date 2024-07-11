import { Injectable } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { format } from 'date-fns';

@Injectable()
export class BookAppointmentService {
    constructor(private prisma: PrismaService,
        private mailService: MailService
    ) { }

    async create(createBookAppointmentDto: CreateBookAppointmentDto) {
        const { name, email, phone, dob, bookingDate, bookingTime, description } = createBookAppointmentDto
        let userExists = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })
        let bookAppointment
        if (userExists) {
            let userId = userExists.id
            bookAppointment = await this.prisma.bookAppointment.create({
                data: {
                    userId,
                    name, email, phone, dob, bookingDateTime: bookingDate + " " + bookingTime, description,
                    status: 'tentative',
                    createdAt: this.makeDate(),
                    updatedAt: this.makeDate(),
                }
            })

        } else {
            let randomPassword = this.makeRandomString()
            const hashPassword = await bcrypt.hash(randomPassword, 12);
            let data = await this.prisma.user.create({
                data: {
                    username: name, displayName: name, email, password: hashPassword, active: false,
                    data: JSON.stringify({}),
                    createdAt: this.makeDate(),
                    updatedAt: this.makeDate(),
                }
            })
            bookAppointment = await this.prisma.bookAppointment.create({
                data: {
                    userId: data.id,
                    name, email, phone, dob, bookingDateTime: bookingDate + " " + bookingTime, description,
                    status: 'tentative',
                    createdAt: this.makeDate(),
                    updatedAt: this.makeDate(),
                }
            })
        }
        if (bookAppointment) {
            await this.mailService.sendMailToAdminBookAppoiontmentCreated({
                name, email, phone, dob, bookingDateTime: bookingDate + " " + bookingTime, description,
                adminName: process.env.ADMIN_NAME,
                adminEmail: process.env.ADMIN_EMAIL,
                appName: process.env.APP_NAME
            })
            await this.mailService.sendMailToClientBookAppoiontmentCreated({
                adminName: process.env.ADMIN_NAME,
                adminEmail: process.env.ADMIN_EMAIL,
                bookingDateTime: bookAppointment.bookingDateTime,
                clientName: name,
                appName: process.env.APP_NAME
            })
        }
    }

    async checkAppointmentAvailability() {
        let appointments = await this.prisma.bookAppointment.findMany({
            where: {
                bookingDateTime: { gte: new Date().toISOString() }
            },
            select: {
                bookingDateTime: true
            }
        })

        return appointments?.map((appointment: any) => appointment.bookingDateTime)
    }

    makeRandomString(length = 8) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    makeDate() {
        var now = new Date()
        return new Date(now).toISOString();
    }
}
