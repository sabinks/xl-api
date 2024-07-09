import { Injectable } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BookAppointmentService {
    constructor(private prisma: PrismaService) { }

    async create(createBookAppointmentDto: CreateBookAppointmentDto) {
        const { name, email, phone, dob, bookingDate, bookingTime, description } = createBookAppointmentDto
        let userExists = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (userExists) {
            let userId = userExists.id
            await this.prisma.bookAppointment.create({
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
            await this.prisma.bookAppointment.create({
                data: {
                    userId: data.id,
                    name, email, phone, dob, bookingDateTime: bookingDate + " " + bookingTime, description,
                    status: 'tentative',
                    createdAt: this.makeDate(),
                    updatedAt: this.makeDate(),
                }
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
