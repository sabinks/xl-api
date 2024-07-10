import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResetPasswordDto } from './reset-password.dto';
import * as bcrypt from 'bcrypt';
import { Exception } from 'handlebars';

@Injectable()
export class ResetPasswordService {

    constructor(private prisma: PrismaService) { }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        let userExist = await this.prisma.user.findFirst({
            where: { email: resetPasswordDto.email }
        })
        if (!userExist) {
            throw new NotFoundException()
        }
        let tokenExists = await this.prisma.resetPassword.findFirst({
            where: { userId: userExist.id, token: resetPasswordDto.token }
        })
        if (!tokenExists) {
            throw new NotFoundException()
        }
        if (tokenExists.tokenUsed) {
            throw new Exception('Token used already, cannot proceed further')
        }

        const hashPassword = await bcrypt.hash(resetPasswordDto.password, 12);
        await this.prisma.user.update({
            where: { email: resetPasswordDto.email },
            data: {
                password: hashPassword
            }
        })
        this.prisma.resetPassword.update({
            where: { userId: userExist.id, token: resetPasswordDto.token },
            data: {
                tokenUsed: true
            }
        })
    }
}
