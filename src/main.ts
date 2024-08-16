import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true,
    });
    app.enableCors({
        origin: process.env.FRONTEND_URL
    });
    // app.useGlobalFilters(new HttpExceptionFilter);
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints[Object.keys(error.constraints)[0]],
                }));
                return new UnprocessableEntityException(result);
            },
            stopAtFirstError: true,
        }),
    );
    app.connectMicroservice({
        global: true,
        transport: Transport.RMQ,
        name: 'MAIL_SERVICE',
        options: {
            urls: [process.env.NODE_ENV == 'development' ? 'amqp://localhost:5672' : `${process.env.RBMQ_URL}`],
            queue: 'mail_queue',
            queueOptions: {
                durable: false
            },
        }
    })
    let port = process.env.PORT || 3000;
    console.log(process.env.NODE_ENV);

    await app.startAllMicroservices()
    await app.listen(port);
    console.log('Main App running on:' + port);

}
bootstrap();
