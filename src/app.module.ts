import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { BookAppointmentsModule } from './auth/book-appointments/book-appointments.module';
import { BookAppointmentModule } from './next/book-appointment/book-appointment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
        }),
        CatModule, LoginModule, RegisterModule, PrismaModule, UserModule, PostModule, RoleModule, BookAppointmentModule, BookAppointmentsModule],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule { }
