import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity({name: 'feactures'})
export class FeacturesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uidCategory?: string;

    @Column()
    name!: string;

    @Column()
    value!: string;

    @CreateDateColumn()
    createAt?: string;

    @UpdateDateColumn()
    updateAt?: string;
}
