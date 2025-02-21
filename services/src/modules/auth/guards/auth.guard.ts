import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "shared/decorators/routes.decorator";
import { LoggerService } from "src/modules/logger/logger.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private loggerService: LoggerService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            this.loggerService.error("Token JWT não encontrado no cabeçalho da requisição.")
            // Quero uma resposta mais amigável para o usuário
            throw new UnauthorizedException("Token JWT não encontrado no cabeçalho da requisição.");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (error) {
            this.loggerService.error("Token JWT da requisição está incorreto. Ele não corresponde aos tokens gerados por essa API.", error);
            throw new UnauthorizedException("Token JWT da requisição está incorreto. Ele não corresponde aos tokens gerados por essa API.");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}