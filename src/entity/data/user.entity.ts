import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid?: string;

    @Column()
    name!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createAt?: string;
    
    @UpdateDateColumn()
    updateAt?: string;

}
