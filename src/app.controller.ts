import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginService } from './auth/login/login.service';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
        private loginService: LoginService,
        private prisma: PrismaService,
        private jwt: JwtService
        // private authService: LoginService
    ) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(AuthGuard('google'))
    @Get('google')
    async google() { }


    @UseGuards(AuthGuard('google'))
    @Get('auth/google/callback')
    async googleCallback(@Req() req, @Res() res: any) {
        let userJson = req.user._json
        let user = await this.prisma.user.findFirst({
            where: {
                email: userJson.email
            }
        })
        if (!user) {
            const hashPassword = await bcrypt.hash('P@ss1234', 12);
            user = await this.prisma.user.create({
                data: {
                    username: userJson.name,
                    displayName: userJson.name,
                    email: userJson.email,
                    password: hashPassword,
                    active: userJson.email_verified,
                    data: JSON.stringify({
                        id: userJson.sub
                    })
                }
            })
        }

        if (user) {
            let accessToken = this.jwt.sign({
                id: user.id,
                username: user.username,
                displayName: (await user).displayName,
                active: (await user).active,
                role: "Member"
            }, { secret: process.env.AUTH_SECRET })
            // let accessToken = await this.loginService.generateJwt({

            // })
            // return {
            //     access_token: accessToken,
            //     role: user.role,
            //     email: user.email,
            //     name: user.displayName,
            //     token_type: 'Bearer',
            //     user_id: user.id,
            //     expires_in: '',
            // }
            res.set('access_token', accessToken)
            return res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${accessToken}`);
        }
    }
}
