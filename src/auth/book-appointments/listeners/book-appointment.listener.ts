import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BookAppointmentCreatedEvent } from "../events/book-appointement-created.event";
import { MailService } from "src/mail/mail.service";


@Injectable()
export class BookAppointmentListener {
    constructor(private mailService: MailService) { }

    @OnEvent('book-appointment.created')
    async handleBookAppointmentCreated(bookAppointment: BookAppointmentCreatedEvent) {
        const { name, email, phone, dob, bookingDateTime, description } = bookAppointment
        if (bookAppointment) {
            await this.mailService.sendMailToAdminBookAppoiontmentCreated({
                name, email, phone, dob, bookingDateTime, description,
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

    @OnEvent('book-appointment.status-confirmed')
    async handleBookAppointmentStatusChange(data: any) {
        await this.mailService.sendMailToClientBookAppoiontmentConfirmed(data)
    }
}