import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, Res, UseGuards, Request } from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('api/auth')
export class LoginController {
    constructor() { }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Request() req) {
        return req.user;
    }
    @Post('get-user')
    @UseGuards(JwtAuthGuard)
    async getUser(@Request() req) {

        const { displayName, email, active, id, } = req.user
        return {
            data: "{\"mobile\":\"\"}",
            email,
            image_path: "",
            is_active: active,
            name: displayName,
            user_id: id,
            role: "superadmin"
        }
    }
    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Request() req) {
        console.log('Inside auth status method');
        console.log(req.user);
    }

}
