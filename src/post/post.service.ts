import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }
    async create(userId: number, data: Prisma.PostCreateWithoutUserInput) {
        await this.prisma.post.create({
            data: {
                ...data, userId
            }
        })
    }

    async findAll() {
        return await this.prisma.post.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} post`;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
