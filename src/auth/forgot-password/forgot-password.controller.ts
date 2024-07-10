import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordDto } from './forgot-password.dto';

@Controller('api')
export class ForgotPasswordController {
    constructor(private readonly forgotPasswordService: ForgotPasswordService) { }

    @Post('forgot-password')
    resetPassword(@Body() forgotPasswordDforgot: ForgotPasswordDto) {
        return this.forgotPasswordService.resetPassword(forgotPasswordDforgot)
    }


}
