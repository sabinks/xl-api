import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createLoginDto: CreateLoginDto, @Req() req: Request, @Res() res: Response) {
        return this.loginService.create(createLoginDto);
    }
}
