import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity({name: 'assets'})
export class AssetsEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uidAsset?: string;

    @Column()
    uidProduct?: string;

    @Column()
    service!: 'local';

    @Column({default: 'desconocido'})
    name?: string;
    
    @Column()
    bucket!: string;

    @Column()
    route!: string;

    @Column()
    type!: string;

    @CreateDateColumn()
    createAt?: string;

    @UpdateDateColumn()
    updateAt?: string;
}
