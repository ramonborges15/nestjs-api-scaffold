<p align="center">
  <img src="./icon.png" alt="Logo" width="300">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue" alt="Versão">
</p>

# NestJS API Scaffold
This project is a scaffold for creating APIs using the NestJS framework. It was designed to simplify API development by including pre-configured settings and functionalities.

## Technologies Used
- Nest JS (Node.js 22)
- TypeORM
- PostgreSQL

## Features
- Authentication
- Migrations
- API documentation using Swagger
- Environment variable configuration
- Logging configuration
- Email sending
- Exception handling
- Password recovery
- File upload configuration

## Installation
To install, follow the steps below:

1. Clone the repository
    ```bash
      git clone https://github.com/ramonborges15/nestjs-api-scaffold.git
    ```
2. Navigate to the `/services` folder
    ```bash
      cd services/
    ```
3. Run the following command to install dependencies
    ```bash
      npm install
    ```
4. Navigate to the `/enviroments` folder
    ```bash
      cd ./../enviroments/
    ```
5. Run the following command to install dependencies
    ```bash
      npm install
    ```
6. If this is your first time running the project, access the `/enviroments` folder and run the following command to create database tables and execute scripts
    ```bash
      npm run dev:run
    ```

## Running the Project
- After completing the steps above, navigate to the `/services` folder and run the following command to start the project

    ```bash
      npm run dev:debug
    ```

- The API will be available at `http://localhost:3333`. . You can access the API documentation at `http://localhost:3333/api`.

## About Migrations
Migrations are files containing changes to be made to the database. For more information, refer to the [Migrations Readme](./environments/README.md).