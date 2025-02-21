import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from 'express';
import { LoggerService } from "src/modules/logger/logger.service";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly loggerService = new LoggerService('HttpExceptionFilter');

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        this.loggerService.error(`[${request.method}] ${request.url} > ${status}`);
        this.loggerService.error(exception.stack || 'No stack trace available');
        this.loggerService.debug(`Body: ${JSON.stringify(request.body)}`);
        this.loggerService.debug(`Params: ${JSON.stringify(request.params)}`);
        this.loggerService.debug(`Query: ${JSON.stringify(request.query)}`);
        this.loggerService.debug(`Headers: ${JSON.stringify(request.headers)}`);
        this.loggerService.debug(`---------------------------------------------------`);

        let message = '';
        let exceptionBody: any;
        try {
            exceptionBody = exception.getResponse()?.valueOf();
        } catch (error) {
            exceptionBody = exception?.message;
        }

        if (typeof exceptionBody === "string") {
            message = exceptionBody;
        } else if (typeof exceptionBody === "object" && typeof exceptionBody.message === "string") {
            message = exceptionBody.message;
        } else if (typeof exceptionBody === "object" && typeof exceptionBody.message === "object") {
            message = exceptionBody?.message[0]?.errors[0];
        }

        response
            .status(status)
            .json({
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
                path: request.url,
                errors: exceptionBody
            });
    }
}