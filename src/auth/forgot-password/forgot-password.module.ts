import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
    imports: [PrismaModule],
    controllers: [ForgotPasswordController],
    providers: [ForgotPasswordService, MailService],
})
export class ForgotPasswordModule { }
