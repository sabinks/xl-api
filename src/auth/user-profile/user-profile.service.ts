import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProfileService {
    constructor(
        private prisma: PrismaService
    ) { }
    create(createUserProfileDto: CreateUserProfileDto) {
        return 'This action adds a new userProfile';
    }

    findAll() {
        return `This action returns all userProfile`;
    }

    async findOne(id: number) {
        return await this.prisma.user.findFirst({
            where: {
                id
            }
        })
    }

    update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
        return `This action updates a #${id} userProfile`;
    }

    remove(id: number) {
        return `This action removes a #${id} userProfile`;
    }
}
