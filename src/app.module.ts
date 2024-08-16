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
import { ContactFormSendMailModule } from './next/contact-form-send-mail/contact-form-send-mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail/mail.service';
import { ContactFormSendMailService } from './next/contact-form-send-mail/contact-form-send-mail.service';
import { ForgotPasswordModule } from './auth/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './auth/reset-password/reset-password.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from './services/file-upload-service/file-upload-service.service';
import { FileUploadProcess } from './next/book-appointment/file-upload.process';
import { Transport, MicroserviceOptions, ClientsModule } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AuthClientsModule } from './auth/clients/clients.module';
import { UserProfileModule } from './auth/user-profile/user-profile.module';
import { ClientNotesModule } from './auth/client-notes/client-notes.module';
import { StripeModule } from './stripe/stripe.module';
import { MathController } from './math/math.controller';
import { MathService } from './math/math.service';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { LoginService } from './auth/login/login.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LoginController } from './auth/login/login.controller';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.AUTH_SECRET,
            signOptions: { expiresIn: "240h" }
        }),
        StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 100,
        }]),
        CatModule,
        LoginModule,
        RegisterModule,
        PrismaModule,
        UserModule,
        PostModule,
        RoleModule,
        BookAppointmentModule,
        BookAppointmentsModule,
        ContactFormSendMailModule,
        EventEmitterModule.forRoot({}),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.MAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
            template: {
                dir: join(__dirname, 'mail/templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
        ContactFormSendMailModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        MulterModule.register({
            dest: './upload',
        }),
        MailModule,
        ClientsModule,
        AuthClientsModule,
        UserProfileModule,
        ClientNotesModule,
        StripeModule,
    ],
    controllers: [AppController, MathController, LoginController],
    providers: [AppService, MailService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        LoginService,
        FileUploadService,
        FileUploadProcess,
        JwtService,
        JwtStrategy,
        MathService,
        GoogleStrategy
    ],
    exports: [MailService, JwtService, LoginService]
})
export class AppModule { }
