import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from 'shared/interceptors/logging.interceptor';
import { HttpExceptionFilter } from 'shared/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    // Configuração para retornar mensagens de erro detalhadas
    exceptionFactory: (errors) => {

      const extractErrors = (validationErrors) => {
        return validationErrors.flatMap((error) => {
          // Se houver constraints, adiciona as mensagens de erro
          if (error.constraints) {
            const response = {
              field: error.property,
              errors: Object.values(error.constraints),
            }

            return response;
          }

          // Se houver erros nos filhos, recursivamente busca as mensagens
          if (error.children && error.children.length > 0) {
            return extractErrors(error.children);
          }

          // Caso não tenha informações suficientes, retorna uma mensagem padrão
          return {
            field: error.property,
            errors: [`Validation failed for field: ${error.property}`]
          }
        });
      };

      return new BadRequestException({
        statusCode: 400,
        message: 'Você digitou informações inválidas. Por favor, verifique os campos e tente novamente.',
        errors: extractErrors(errors),
      });
    }
  }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS Backend Auth API')
    .setDescription('Esta é a documentação da API de autenticação Backend.')
    .setVersion('1.0')
    .addTag("Autenticação", "Listagem dos endpoints relacionados a autenticação")
    .addTag('Configurações de banco de dados', 'Listagem dos endpoints relacionados a configurações de banco de dados')
    .addTag("Usuários", "Listagem dos endpoints relacionados a usuários")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3335);
}
bootstrap();
