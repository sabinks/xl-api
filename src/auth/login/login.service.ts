import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { log } from 'handlebars';

@Injectable()
export class LoginService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService) { }

    async validateUser({ email, password }: LoginDto) {
        let findUser = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!findUser) {
            return null
        }

        let passwordMatch = await bcrypt.compare(password, (await findUser).password)
        let userRoles = await this.prisma.userRole.findFirst({
            where: {
                userId: findUser.id
            }, select: {
                role: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (passwordMatch) {
            return { ...findUser, role: userRoles.role.name }
        }

    }
    async generateJwt(user) {
        return this.jwt.sign({
            id: user.id,
            username: user.username,
            displayName: (await user).displayName,
            active: (await user).active,
            role: (await user).role
        })

    }
}
