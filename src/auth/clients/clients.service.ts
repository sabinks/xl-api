import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Prisma } from '@prisma/client';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ClientsService {
    constructor(
        private prisma: PrismaService,
    ) { }
    create(createClientDto: CreateClientDto) {
        return 'This action adds a new client';
    }

    async findAll({ where, orderBy, page = 1, perPage = 10 }: {
        where?: Prisma.UserWhereInput,
        orderBy?: Prisma.UserOrderByWithRelationInput,
        page?: number,
        perPage?: number
    }) {
        return paginate(
            this.prisma.user,
            {
                where,
                orderBy,
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
            }
        })
    }

    async update(id: number, updateClientDto: UpdateClientDto) {
        console.log(updateClientDto);

        const { username, email, phone, dob, active } = updateClientDto
        return await this.prisma.user.update({
            where: {
                id
            }, data: {
                username, email, phone, dob, active
            }
        })
        return `This action updates a #${id} client`;
    }

    remove(id: number) {
        return `This action removes a #${id} client`;
    }
}
