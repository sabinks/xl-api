import { DynamicModule, Module, Provider } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [StripeModule, PrismaModule],
    controllers: [StripeController],
    providers: [StripeService]
})
export class StripeModule {
    static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
        const stripe = new Stripe(apiKey, config)
        const stripeProvider: Provider = {
            provide: 'STRIPE_CLIENT',
            useValue: stripe
        }
        return {
            module: StripeModule,
            providers: [stripeProvider],
            exports: [stripeProvider],
            global: true
        }
    }
}
