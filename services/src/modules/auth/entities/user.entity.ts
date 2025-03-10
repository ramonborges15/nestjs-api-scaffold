import { randomUUID } from "crypto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    public uuid: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    public createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    public updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    public deletedAt: string;

    @Column({ type: 'varchar' })
    public name: string;

    @Column({ type: 'varchar', unique: true })
    public email: string;

    @Column({ type: 'varchar' })
    public password: string;

    @Column({ name: 'role_id', type: 'int4' })
    public roleId: number;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    public role: Role;

    public toHashPassword(passwordHashed: string) {
        this.password = passwordHashed;
    }

    public generateUUID() {
        this.uuid = randomUUID();
    }
}