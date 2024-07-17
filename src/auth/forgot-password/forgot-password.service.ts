import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ForgotPasswordDto } from './forgot-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { uid } from 'uid';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ForgotPasswordService {
    constructor(private prisma: PrismaService,
        @Inject('MAIL_SERVICE') private client: ClientProxy
    ) { }
    async resetPassword(forgotPassword: ForgotPasswordDto) {
        let userExist = await this.prisma.user.findFirst({
            where: { email: forgotPassword.email }
        })

        if (!userExist) {
            throw new NotFoundException()
        }
        let token = uid(20)
        await this.prisma.resetPassword.update({
            where: { userId: userExist.id },
            data: {
                userId: userExist.id,
                token,
                tokenUsed: false
            }
        })
        let payload = {
            username: userExist.username ? userExist.username : userExist.email,
            email: userExist.email,
            resetUrl: process.env.FRONTEND_URL + "/reset-password?token=" + token

        }
        this.client.emit('forgot-password', payload)
        // this.mailService.resetPasswordMail(payload)
    }
}
