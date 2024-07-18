import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService,
        JwtService
    ],
    exports: [JwtService]
})
export class UserModule { }
