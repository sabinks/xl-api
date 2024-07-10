import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerificationService {
    constructor(private prisma: PrismaService) { }

    async emailVerification(email: string, token: string) {
        let userExist = await this.prisma.user.findFirst({
            where: {
                email, verificationToken: token
            }
        })
        if (!userExist) {
            throw new NotFoundException()
        }
        this.prisma.user.update({
            where: {
                email, verificationToken: token
            },
            data: {
                verificationToken: '', emailVerifiedAt: format(new Date(), 'YYYY-MM-DD hh:mm:ss'), active: true
            }
        })
    }
}
