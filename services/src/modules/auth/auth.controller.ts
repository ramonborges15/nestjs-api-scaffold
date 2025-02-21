import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../../../shared/decorators/routes.decorator';
import { AuthService } from './auth.service';
import ChangePasswordDTO from './dtos/change-password.dto';
import SendPasswordResetEmailDTO from './dtos/send-password-reset-email.dto';
import SignInDTO from './dtos/sign-in.dto';
import SignUpDTO from './dtos/sign-up.dto';
import UserDto from './dtos/user.dto';

// AuthenticatedRequest is composed of parsed parameters from JWT token. It is done by AuthGuard automatically.
interface AuthenticatedRequest extends Request {
    user: any;
}

class AccessTokenResponse {
    @ApiProperty()
    accessToken: string;
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Realiza login' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Usuário logado com sucesso', type: AccessTokenResponse })
    @Post('login')
    async login(@Body() signInDTO: SignInDTO) {
        return await this.authService.login(signInDTO);
    }

    @SkipAuth()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário criado com sucesso', type: UserDto })
    @Post('sign-up')
    async signUp(@Body() signUpDTO: SignUpDTO) {
        return await this.authService.signUp(signUpDTO);
    }

    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Envia e-mail para redefinição de senha' })
    @ApiResponse({ status: HttpStatus.OK, description: 'E-mail enviado com sucesso' })
    @Post('/send-password-reset-email')
    async sendPasswordResetEmail(@Body() sendPasswordResetEmailDTO: SendPasswordResetEmailDTO) {
        return await this.authService.sendPasswordResetEmail(sendPasswordResetEmailDTO);
    }

    @Patch('/change-password')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Altera senha do usuário' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Senha alterada com sucesso', type: UserDto })
    async changePassword(@Body() changePasswordDTO: ChangePasswordDTO, @Req() req: AuthenticatedRequest) {
        const email = req.user.email
        const uuid = req.user.sub;
        await this.authService.changePassword(changePasswordDTO, email, uuid);
    }
}
