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
import { VerificationModule } from './auth/verification/verification.module';
import { ForgotPasswordModule } from './auth/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './auth/reset-password/reset-password.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true
        }),
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
        MailModule,
        ContactFormSendMailModule,
        VerificationModule,
        ForgotPasswordModule,
        ResetPasswordModule,
    ],
    controllers: [AppController],
    providers: [AppService, MailService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [MailService]
})
export class AppModule { }
