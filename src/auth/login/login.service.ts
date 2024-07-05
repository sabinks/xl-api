import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService) { }

    async validateUser({ email, password }: LoginDto) {
        let findUser = this.prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!findUser) {
            return null
        }
        let passwordMatch = await bcrypt.compare(password, (await findUser).password)
        if (passwordMatch) {
            return findUser
        }
    }
    async generateJwt(user) {
        return this.jwt.sign({
            id: user.id,
            username: user.username,
            displayName: (await user).displayName,
            active: (await user).active
        })

    }
}
