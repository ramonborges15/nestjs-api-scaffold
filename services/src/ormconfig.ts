import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export function getDataSourceConfig(configService: ConfigService): DataSourceOptions {
    return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
    }
}