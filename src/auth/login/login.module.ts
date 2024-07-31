import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions: { expiresIn: "240h" }
        }),
        PrismaModule],
    controllers: [LoginController],
    providers: [LoginService, LocalStrategy, JwtStrategy],
})
export class LoginModule { }
