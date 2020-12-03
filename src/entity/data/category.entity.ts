import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity({name: 'category'})
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    uidCategory?: string;

    @Column()
    name!: string;

    @Column({default: ''})
    description?: string;

    @CreateDateColumn()
    createAt?: string;

    @UpdateDateColumn()
    updateAt?: string;
}
