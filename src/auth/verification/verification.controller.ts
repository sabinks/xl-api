import { Controller, Get, Query } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('api')
export class VerificationController {
    constructor(private readonly verificationService: VerificationService) { }

    @Get('email-verification')
    emailVerification(@Query() email: string, @Query() token: string) {
        this.verificationService
    }
}
