import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        let server_name = process.env.SERVER_NAME
        return 'Hello World!' + server_name;
    }
}
