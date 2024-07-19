import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ClientNotesService } from './client-notes.service';
import { CreateClientNoteDto } from './dto/create-client-note.dto';
import { UpdateClientNoteDto } from './dto/update-client-note.dto';
import { RolesGuard } from '../guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('api/clients')
export class ClientNotesController {
    constructor(private readonly clientNotesService: ClientNotesService) { }

    @Post('/:id/notes')
    create(@Body() createClientNoteDto: CreateClientNoteDto, @Param('id') id: string) {
        return this.clientNotesService.create(createClientNoteDto, +id);
    }

    @Get(':id/notes')
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    findAll(
        @Param('id') id: string,
        @Query('perPage') perPage: number,
        @Query('page') page: number,
        @Query('order') order: string,
        @Query('orderBy') orderBy: string,
        @Query('search') search: string) {
        if (search) {
            return this.clientNotesService
                .findAll({
                    where: {
                        userId: +id, note: search
                    }, orderBy: { [orderBy]: order }, perPage, page
                });

        } else {
            return this.clientNotesService
                .findAll({ where: { userId: +id }, orderBy: { [orderBy]: order }, perPage, page });
        }
    }

    @Get(':clientId/notes/:id')
    findOne(@Param('id') id: string) {
        return this.clientNotesService.findOne(+id);
    }

    @Patch(':clientId/notes/:id')
    update(@Param('id') id: string, @Body() updateClientNoteDto: UpdateClientNoteDto) {
        return this.clientNotesService.update(+id, updateClientNoteDto);
    }

    @Delete(':clientId/notes/:id')
    remove(@Param('id') id: string) {
        return this.clientNotesService.remove(+id);
    }
}
