import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashProvider } from 'shared/providers/hash-providers/hash.provider';
import BCryptHashProvider from 'shared/providers/hash-providers/implementations/bcrypt-hash.provider';
import { MailProvider } from 'shared/providers/mail-providers/mail.provider';
import NodeMailerProvider from 'shared/providers/mail-providers/implementations/nodemailer.provider';
import { Role } from './entities/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    }),
    LoggerModule.register('Auth')
  ],
  providers: [
    AuthService,
    {
      provide: HashProvider,
      useClass: BCryptHashProvider
    },
    {
      provide: MailProvider,
      useClass: NodeMailerProvider
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  controllers: [AuthController]
})
export class AuthModule { }
