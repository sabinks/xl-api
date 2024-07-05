import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
    constructor(private prisma: PrismaService) { }

    async create({ username, displayName, email, password }: CreateRegisterDto) {
        const hashPassword = await bcrypt.hash(password, 12);
        let data = await this.prisma.user.create({
            data: {
                username, displayName, email, password: hashPassword, active: false,
            }
        })
        const { password: hidePassword, ...user } = data
        return user
    }

}
