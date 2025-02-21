import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {
  static register(context: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useValue: new LoggerService(context)
        }
      ],
      exports: [LoggerService]
    };
  }
}
