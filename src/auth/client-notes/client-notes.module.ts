import { Module } from '@nestjs/common';
import { ClientNotesService } from './client-notes.service';
import { ClientNotesController } from './client-notes.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ClientNotesController],
    providers: [ClientNotesService, JwtService],
    exports: [JwtService]
})
export class ClientNotesModule { }
