import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@ApiTags('Usuários')
@Controller('users')
@ApiBearerAuth()
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


}
