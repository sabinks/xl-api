import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService,

    ],
})
export class UserModule { }
