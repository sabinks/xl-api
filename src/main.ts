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
        transport: Transport.RMQ,
    })
    let port = process.env.PORT || 3000;
    await app.startAllMicroservices()
    await app.listen(port);
    console.log('Main App running on:' + port);

}
bootstrap();
