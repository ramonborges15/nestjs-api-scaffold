# Migrations
Migrations are files that contain changes to be made to the database. We are using TypeORM to manage migrations. For every new database change, a new migration must be created.

## Create a New Migration
1. Navigate to the `/environments/migrations` folder.
2. Run the command:
    ```
        $ npx typeorm migration:create nome_da_migration
    ```
## Run Migrations
1. Navigate to the  `/environments` folder.
2. Run the command:
    ```
        $ npm run dev:run
    ```