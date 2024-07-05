import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, Res, UseGuards, Request } from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class LoginController {
    constructor() { }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Request() req) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Request() req) {
        console.log('Inside auth status method');
        console.log(req.user);
    }

}
