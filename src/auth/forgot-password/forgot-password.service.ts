import { Injectable, NotFoundException } from '@nestjs/common';
import { ForgotPasswordDto } from './forgot-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { uid } from 'uid';

@Injectable()
export class ForgotPasswordService {
    constructor(private prisma: PrismaService,
        private mailService: MailService
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
        this.mailService.resetPasswordMail({
            username: userExist.username ? userExist.username : userExist.email,
            email: userExist.email,
            resetUrl: process.env.FRONTEND_URL + "/reset-password?token=" + token
        })
    }
}
