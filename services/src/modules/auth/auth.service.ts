import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import SignInDTO from './dtos/sign-in.dto';
import SendPasswordResetEmailDTO from './dtos/send-password-reset-email.dto';
import ChangePasswordDTO from './dtos/change-password.dto';
import SignUpDTO from './dtos/sign-up.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashProvider } from 'shared/providers/hash-providers/hash.provider';
import UserDto from './dtos/user.dto';
import { obfuscateEmail } from 'shared/utils/utils';
import { JwtPayload } from './strategies/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import EmailMetadata from 'shared/providers/mail-providers/email-metadata.entity';
import { ConfigService } from '@nestjs/config';
import { MailProvider } from 'shared/providers/mail-providers/mail.provider';
import { LoggerService } from '../logger/logger.service';
import { Role } from './entities/role.entity';
import { UserViewModel } from './view-models/user.view-model';

@Injectable()
export class AuthService {

    constructor(
        private readonly loggerService: LoggerService,
        private dataSource: DataSource,
        private hashProvider: HashProvider,
        private mailProvider: MailProvider,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userService: Repository<User>,
        @InjectRepository(Role)
        private readonly roleService: Repository<Role>
    ) { }

    async login(signInDTO: SignInDTO) {
        const user: User | null = await this.userService.findOneBy({ email: signInDTO.email });

        if (!user) {
            this.loggerService.error(`[Login]: Não foi encontrado nenhum usuário no sistema com este e-mail '${obfuscateEmail(signInDTO.email)}'`);
            throw new HttpException("Combinação de e-mail/senha incorreta!", HttpStatus.UNAUTHORIZED);
        }

        const passwordMatched: boolean = await this.hashProvider.compareHash(signInDTO.password, user.password);

        if (!passwordMatched) {
            this.loggerService.error(`[Login] Usuário digitou a senha errada: ${obfuscateEmail(signInDTO.email)}`);
            throw new HttpException("Combinação de e-mail/senha incorreta!", HttpStatus.UNAUTHORIZED);
        }

        const payload: JwtPayload = {
            email: user.email,
            sub: user.uuid,
            name: user.name
        };
        const accessToken: string = await this.jwtService.signAsync(payload);

        return {
            accessToken
        };
    }

    async signUp(signUpDTO: SignUpDTO): Promise<UserDto> {
        const user: User | null = await this.userService.findOneBy({ email: signUpDTO.email });

        if (user) {
            this.loggerService.error(`[Login]: Email já se encontra cadastrado.`);
            throw new HttpException('Você não pode usar este e-mail.', HttpStatus.BAD_REQUEST);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {

            const role: Role | null = await this.roleService.findOneBy({ code: 'USER' });
            if (!role) {
                this.loggerService.error(`[Login]: Não foi encontrado nenhum papel com o código 'USER'.`);
                throw new HttpException('Não foi possível criar o usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            let userCreated = queryRunner.manager.create(User, {
                name: signUpDTO.name,
                email: signUpDTO.email,
                password: signUpDTO.password,
                role: role
            });

            const passwordHashed = await this.hashProvider.generateHash(signUpDTO.password);
            userCreated.toHashPassword(passwordHashed);
            userCreated.generateUUID();

            const userSaved = await queryRunner.manager.save(userCreated);

            await queryRunner.commitTransaction();
            return UserViewModel.toDto(userSaved);

        } catch (error: any) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
            this.loggerService.error(error);
            this.loggerService.error(error?.sql);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }

    async changePassword(changePasswordDTO: ChangePasswordDTO, email: string, uuid: string): Promise<UserDto> {
        if (changePasswordDTO.password !== changePasswordDTO.confirmPassword) {
            this.loggerService.error(`[Alterar senha]: Senha e confirmação de senha não conferem. E-mail: ${obfuscateEmail(email)}`);
            throw new HttpException("Senha e confirmação de senha são diferentes.", HttpStatus.BAD_REQUEST);
        }

        const user: User | null = await this.userService.findOneBy({ email: email, uuid: uuid });

        if (!user) {
            this.loggerService.error(`[Alterar senha]: Usuário não encontrado. E-mail: ${obfuscateEmail(email)}, UUID: ${uuid}`);
            throw new HttpException("Usuário não encontrado.", HttpStatus.NOT_FOUND);
        }

        const passwordHashed = await this.hashProvider.generateHash(changePasswordDTO.password);
        user.toHashPassword(passwordHashed);

        const userUpdated = await this.userService.save(user);
        return {
            uuid: userUpdated.uuid,
            email: userUpdated.email,
            name: userUpdated.name
        } as UserDto;
    }

    async sendPasswordResetEmail(sendPasswordResetEmailDTO: SendPasswordResetEmailDTO): Promise<void> {
        const user: User | null = await this.userService.findOneBy({ email: sendPasswordResetEmailDTO.email });

        if (!user) {
            this.loggerService.error(`[Enviar e-mail de redefinição de senha]: Não foi encontrado nenhum usuário no sistema com o e-mail '${obfuscateEmail(sendPasswordResetEmailDTO.email)}'`);
            throw new HttpException("Não foi encontrado nenhum usuário com este e-mail!", HttpStatus.NOT_FOUND);
        }

        // Gerar token para redefinição de senha.
        const payload = { email: user.email, sub: user.uuid };
        const token: string = await this.jwtService.signAsync(payload);

        // Inserir e-mail
        const emailsTo: string[] = [];
        emailsTo.push(user.email);

        try {
            // Preparar corpo do e-mail
            const emailMetadata: EmailMetadata = {
                emailTo: emailsTo,
                subject: 'Link para Redefinir Sua Senha',
                template: './password_reset_email.hbs',
                attachments: [],
                context: {
                    name: user.name,
                    link: `${this.configService.get<string>('FRONTEND_BASE_URL') as string}/ResetPassword?token=${token}`
                }
            }

            const response = await this.mailProvider.sendEmail(emailMetadata);
            this.loggerService.debug(response);
        } catch (error) {
            this.loggerService.error(`[Enviar e-mail de redefinição de senha] Erro ao enviar e-mail para '${obfuscateEmail(sendPasswordResetEmailDTO.email)}'`);
            this.loggerService.error(error);
            throw new HttpException("Erro ao enviar e-mail.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
