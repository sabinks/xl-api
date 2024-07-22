import { Controller, Get, } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('/api/next/get-stripe-intent')
export class StripeController {
    constructor(private readonly stripeService: StripeService,
    ) { }
    @Get('/')
    checkAppointmentAvailability() {
        return this.stripeService.createStripeIntent()
    }
}
