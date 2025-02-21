import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAuthTables1738353382377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    { name: 'id', type: 'int4', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'code', type: 'varchar', isNullable: false, isUnique: true },
                    { name: 'description', type: 'varchar', isNullable: false }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'uuid', type: 'uuid', isPrimary: true, isUnique: true, generationStrategy: 'uuid' },
                    { name: 'created_at', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'updated_at', type: 'timestamp without time zone', isNullable: false, default: 'now()' },
                    { name: 'deleted_at', type: 'timestamp without time zone', isNullable: true },
                    { name: 'name', type: 'varchar', isNullable: false },
                    { name: 'email', type: 'varchar', isNullable: false, isUnique: true },
                    { name: 'password', type: 'varchar', isNullable: false },
                    { name: 'role_id', type: 'int4', isNullable: false }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['role_id'],
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                        name: 'fk_users_has_roles',
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('roles');
    }

}
