# Migrations
As migrations são arquivos que contém as alterações que serão feitas no banco de dados. Estamos utilizando o TypeORM para gerenciar as migrations. Para cada nova alteração no banco de dados, é necessário criar uma nova migration.

## Criar uma nova migration
1. Acesse a pasta `/environments/migrations`
2. Execute o comando:
    ```
        $ npx typeorm migration:create nome_da_migration
    ```
## Executar as migrations
1. Acesse a pasta `/environments`
2. Execute o comando:
    ```
        $ npm run dev:run
    ```