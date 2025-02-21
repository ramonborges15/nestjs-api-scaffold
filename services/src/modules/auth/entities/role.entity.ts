import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'code', type: 'varchar' })
    public code: string;

    @Column({ name: 'description', type: 'varchar' })
    public description: string;
}