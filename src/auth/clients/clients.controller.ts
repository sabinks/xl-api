import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RolesGuard } from '../guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { ActiveStatusClientDto } from './dto/active-status-client.dto';

@Controller('api/clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    findAll(
        @Query('perPage') perPage: number,
        @Query('page') page: number,
        @Query('order') order: string,
        @Query('orderBy') orderBy: string,
        @Query('search') search: string
    ) {
        return this.clientsService
            .findAll({
                where: {}, select: {
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
                    active: true,
                    createdAt: true,
                    updatedAt: true,
                    customerId: true
                }, orderBy: { [orderBy]: order }, perPage, page
            });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.clientsService.update(+id, updateClientDto);
    }

    @Post('/:id/active-status')
    activeStatusChange(@Param('id') id: string, @Body() activeStatusClient: ActiveStatusClientDto) {
        return this.clientsService.activeStatusChange(+id, activeStatusClient);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }
}
