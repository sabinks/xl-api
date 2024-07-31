import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Prisma } from '@prisma/client';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActiveStatusClientDto } from './dto/active-status-client.dto';
const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ClientsService {
    constructor(
        private prisma: PrismaService,
    ) { }
    create(createClientDto: CreateClientDto) {
        return 'This action adds a new client';
    }

    async findAll({ where, select, orderBy, page = 1, perPage = 10 }: {
        where?: Prisma.UserWhereInput,
        select?: any,
        orderBy?: Prisma.UserOrderByWithRelationInput,
        page?: number,
        perPage?: number
    }) {
        return paginate(
            this.prisma.user,
            {
                where,
                orderBy,
                select
            },
            {
                page,
                perPage: perPage
            },
        );
    }

    async findOne(id: number) {
        return await this.prisma.user.findFirst({
            where: {
                id
            }, select: {
                id: true,
                username: true,
                displayName: true,
                email: true,
                dob: true,
                phone: true,
                emailVerifiedAt: false,
                verificationToken: false,
                profileImage: false,
                profileImagePath: true,
                selfSignup: false,
                data: true,
                password: false,
                active: false,
                createdAt: false,
                updatedAt: true,
                customerId: true
            }
        })
    }

    async update(id: number, updateClientDto: UpdateClientDto) {

        const { username, email, phone, dob, active } = updateClientDto
        await this.prisma.user.update({
            where: {
                id
            }, data: {
                username, email, phone, dob, active
            }
        })
        return {
            message: 'Client profile updated!'
        }
    }
    async activeStatusChange(id: number, activeStatus: ActiveStatusClientDto) {

        const { active } = activeStatus
        await this.prisma.user.update({
            where: {
                id
            }, data: {
                active
            }
        })
        return {
            message: 'Client profile updated!'
        }
    }

    remove(id: number) {
        return `This action removes a #${id} client`;
    }
}
