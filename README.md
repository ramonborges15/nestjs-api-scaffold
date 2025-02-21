<p align="center">
  <img src="./icon.png" alt="Logo" width="300">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue" alt="Versão">
</p>

# NestJS API Scaffold
Este projeto é um scaffold para criação de APIs utilizando o framework NestJS. O projeto foi criado com o intuito de facilitar a criação de APIs, já contendo algumas configurações e funcionalidades prontas.

## Tecnologias Utilizadas
- Nest JS (Node.js 22)
- TypeORM
- PostgreSQL

## Funcionalidades
- Autenticação
- Migrations
- Documentação da API utilizando Swagger
- Configuração de variáveis de ambiente
- Configuração de logs
- Envio de e-mails
- Tratamento de exceções
- Recuperação de senha
- Configuração de Upload de arquivos

## Instalação
Para instalar, siga os passos abaixo:

1. Clone o repositório
    ```bash
      git clone https://github.com/ramonborges15/nestjs-api-scaffold.git
    ```
2. Navegue até a pasta `/services` 
    ```bash
      cd services/
    ```
3. Execute o comando abaixo para instalar as dependências
    ```bash
      npm install
    ```
4. Navegue até a pasta `/enviroments`
    ```bash
      cd ./../enviroments/
    ```
5. Execute o comando abaixo para instalar as dependências
    ```bash
      npm install
    ```
6. Se for a primeira vez que você está rodando o projeto, acesse a pasta `/enviroments` e execute o comando abaixo para criar as tabelas no banco de dados e executar os scripts
    ```bash
      npm run dev:run
    ```

## Rodando o Projeto
- Após a execução dos passos anteriores, acesse a pasta `/services` e execute o comando abaixo para rodar o projeto

    ```bash
      npm run dev:debug
    ```

- A API estará disponível em `http://localhost:3333`. Você pode acessar a documentação da API em `http://localhost:3333/api`.

## Sobre as migrations
As migrations são arquivos que contém as alterações que serão feitas no banco de dados. Para mais informações acesse [Readme sobre migrations](./environments/README.md).