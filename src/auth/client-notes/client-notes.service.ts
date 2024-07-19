import { Injectable } from '@nestjs/common';
import { CreateClientNoteDto } from './dto/create-client-note.dto';
import { UpdateClientNoteDto } from './dto/update-client-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PaginateFunction, paginator } from 'src/pagination/paginator';
const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ClientNotesService {
    constructor(
        private prisma: PrismaService
    ) { }
    async create(createClientNoteDto: CreateClientNoteDto, id: number) {
        const { name, note } = createClientNoteDto
        await this.prisma.clientNote.create({
            data: {
                userId: id,
                name, note,
                createdAt: new Date().toISOString().toString(),
                updatedAt: new Date().toISOString().toString(),
            }
        })
    }

    async findAll({ where, orderBy, page = 1, perPage = 10 }: {
        where?: Prisma.ClientNoteWhereInput,
        orderBy?: Prisma.ClientNoteOrderByWithRelationInput,
        page?: number,
        perPage?: number
    }) {
        return paginate(
            this.prisma.clientNote,
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
        return await this.prisma.clientNote.findFirst({
            where: {
                id
            }
        })
    }

    async update(id: number, updateClientNoteDto: UpdateClientNoteDto) {
        const { name, note } = updateClientNoteDto

        return await this.prisma.clientNote.update({
            where: {
                id
            },
            data: {
                name, note,
                updatedAt: new Date().toISOString().toString()
            }
        })
    }

    async remove(id: number) {
        return await this.prisma.clientNote.delete({
            where: {
                id
            }
        })
    }
}
