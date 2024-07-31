import { Controller, Get } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {

    constructor(private mathSrv: MathService) { }

    @Get()
    getHello(): string {
        return 'Hello World!'
    }

}
