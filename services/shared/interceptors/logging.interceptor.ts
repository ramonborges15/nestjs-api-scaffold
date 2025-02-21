import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { LoggerService } from "src/modules/logger/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private readonly loggerService = new LoggerService('LoggingInterceptor');

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const now = Date.now();

        const req = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        const { originalUrl, method, params, query, body } = req;

        this.loggerService.log(`[${method}] ${originalUrl}`);

        return next
            .handle()
            .pipe(
                tap((data) => {
                    this.loggerService.log(`Status Code Response: ${statusCode}`);
                }),
            );
    }

}