import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: `${configService.get<string>('MULTER_DEST')}`,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    LoggerModule.register('User'),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
