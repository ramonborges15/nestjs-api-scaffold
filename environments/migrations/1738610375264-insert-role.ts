import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRole1738610375264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (code, description) VALUES ('USER', 'Users');    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM roles WHERE code = 'USER';
        `);
    }
}
