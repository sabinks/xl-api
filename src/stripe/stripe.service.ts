import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    constructor(
        private prisma: PrismaService,
        @Inject('STRIPE_CLIENT') private stripe: Stripe
    ) { }
    async checkPaymentExists(cusId, refId) {
        let bookAppointment = this.prisma.bookAppointment.findFirst({
            where: {
                id: refId
            }
        })
        if ((await bookAppointment).paymentId) {
            return {
                message: 'Payment Completed',
            }
        }
    }
    async createStripeIntent(amt, cur, cusId, refId) {
        let bookAppointment = this.prisma.bookAppointment.findFirst({
            where: {
                id: refId
            }
        })
        if ((await bookAppointment).paymentId) {
            throw new ForbiddenException('Payment successful, no action required!')
        }
        let user = this.prisma.user.findFirst({
            where: {
                customerId: cusId
            }
        })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        let paymentIntent = await this.stripe.paymentIntents.create({
            currency: process.env.STRIPE_CURRENCY,
            amount: amt * 100,
            customer: cusId,
            metadata: {
                name: (await user).username,
                email: (await user).email,
                service: 'Book Appointment Payment',
                status: 'Completed'
            }
        })
        return paymentIntent
    }


    async paymentSuccess(paymentId, cusId, refId) {
        let user = await this.prisma.user.findFirst({
            where: {
                customerId: cusId
            }
        })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        let bookAppointment = await this.prisma.bookAppointment.findFirst({
            where: {
                id: refId
            }
        })
        if (!bookAppointment) {
            throw new NotFoundException('Appointment not found')
        }
        await this.prisma.bookAppointment.update({
            where: {
                id: refId
            },
            data: {
                paymentStatus: 'Payment Completed',
                paymentId: paymentId
            }
        })

        return "Payment succesful"
    }

    async cancelStripeIntent(paymentIntent: string) {

        let status = await this.stripe.paymentIntents.cancel(paymentIntent)
        return status
    }
}
