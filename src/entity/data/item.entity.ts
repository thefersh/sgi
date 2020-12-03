import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'item'})
export class ItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uidItem?: string;

    @Column()
    uidProduct!: string;

    @Column({default: 0})
    isSold?: number;

    @CreateDateColumn()
    createAt?: string;

    @UpdateDateColumn()
    updateAt?: string;
}
