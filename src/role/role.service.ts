import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }
    async create(createRoleDto: Prisma.RoleCreateInput) {
        let role = await this.prisma.role.findFirst({
            where: {
                name: createRoleDto.name
            }
        })
        if (role) {
            throw new HttpException('Duplicate role name exists', 400)
        }
        await this.prisma.role.create({ data: { ...createRoleDto } })
    }

    findAll() {
        return `This action returns all role`;
    }

    findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }
}
