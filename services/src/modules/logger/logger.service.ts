import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends Logger {
    private readonly logger: winston.Logger;

    constructor(context: string) {
        super(context);

        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.errors({ stack: true }),
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: `logs/%DATE%-error.log`,
                    level: 'error',
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxSize: '20m',
                    maxFiles: '30d',
                }),
                new winston.transports.DailyRotateFile({
                    filename: `logs/%DATE%-combined.log`,
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxSize: '20m',
                    maxFiles: '30d',
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.cli(),
                        winston.format.splat(),
                        winston.format.timestamp(),
                        winston.format.prettyPrint(),
                        winston.format.printf((info) => {
                            return `${info.timestamp} [${context}] ${info.level}: ${info.message}`;
                        }),
                    )
                })
            ],
        });
    }

    public log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    public error(message: string, trace?: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    public debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }
}
