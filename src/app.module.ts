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

@Module({
    imports: [CatModule, LoginModule, RegisterModule, PrismaModule, UserModule, PostModule, RoleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
