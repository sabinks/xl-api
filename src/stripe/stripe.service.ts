import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    constructor(
        private prisma: PrismaService,
        @Inject('STRIPE_CLIENT') private stripe: Stripe
    ) { }

    async createStripeIntent() {
        let paymentIntent = await this.stripe.paymentIntents.create({
            currency: process.env.STRIPE_CURRENCY,
            amount: 1000,
            customer: 'id',
            metadata: {
                name: 'username',
                email: 'email@mail.com',
                service: 'Book Appointment',
                status: 'Completed'
            }
        })
        return paymentIntent
    }
}
