import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity({name: 'products'})
export class ProductsEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uidProduct?: string;

    @Column()
    uidCategory!: string;

    @Column()
    name!: string;
    
    @Column({length: 300})
    description!: string;

    @Column()
    price!: string;
    
    @Column({ default: '' })
    img?: string; 

    @CreateDateColumn()
    createAt?: string;

    @UpdateDateColumn()
    updateAt?: string;
}
