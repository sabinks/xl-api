import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { format } from 'date-fns';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                status: status,
                timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                path: request.url,
            });
    }
}