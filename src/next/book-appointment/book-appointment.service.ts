import { Inject, Injectable } from '@nestjs/common';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { format } from 'date-fns';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { log } from 'handlebars';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BookAppointmentService {
    constructor(private prisma: PrismaService,
        private mailService: MailService,
        private eventEmitter: EventEmitter2,
        @InjectQueue('fileUpload') private fileUploadQueue: Queue,
        @Inject('MAIL_SERVICE') private client: ClientProxy,

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
        // this.eventEmitter.emit('book-appointment.created', {
        //     ...bookAppointment
        // })
        this.client.emit('book-appointment.created', bookAppointment)

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

    async uploadFile(file) {
        await this.fileUploadQueue.add('upload-to-s3', {
            file
        })
        console.log('here i am ');
    }
    handleSendMail() {
        this.client.emit('test-message', { name: 'John Doe', age: '19' })
        console.log('Message sent');
    }
}
