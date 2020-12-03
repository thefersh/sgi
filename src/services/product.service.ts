import { getManager } from 'typeorm';
import { ProductsEntity } from '../entity/data/product.entity';
import { CategoryEntity } from '../entity/data/category.entity';
import { Request, Response } from 'express';
import { ItemEntity } from '../entity/data/item.entity';

export class ProductService {

    createProductBase(req: Request, res: Response) {
        if(req.body.name && req.body.price && req.body.description && req.body.cantidad){
            const p = new ProductsEntity();
            p.name = req.body.name;
            p.price = req.body.price;
            p.description = req.body.description;
            p.uidCategory = 'off';

            p.save().then(r => {
                let data: any[] = [];
                for(let x = 1;x < req.body.cantidad; x++) {
                    data.push({uidProduct : r.uidProduct });
                }
                ItemEntity.createQueryBuilder().insert().values(data).execute().then(d => res.json({
                    data: r.uidProduct
                })).catch(e => res.json({err: 'Ups... Hubo un error Interno'}))
                
            }).catch(e => {console.log(e); res.json({err: 'Ups... Hubo un error interno'});});
        }else {
            res.json({
                err: 'Rellene los datos.'
            });
        }
    }

    getCategory(req: Request, res: Response){ this.getAllCategory().then(t => res.json({data: t})).catch(e => res.json({err: 'Hubo una falla en el servidor'}))}

    getInfo(req: Request, res: Response): void {
        if (req.query.type){
            switch(req.query.type){
                case 'basicInfo': 
                    this.getBasicInfo(req.query.id as string).then(r => res.json({data: r})).catch(e => res.json({err: 'No se encontro el Producto'}))
                    break;
                default:
                    res.json({err: 'No se encuentra el dato'});
                    break;
            }
        }else {
            res.json({err: 'No se espesifico el dato'})
        }
    }

    setCategory(req: Request, res: Response): void {
        if (req.body.uid && req.body.asign){
            ProductsEntity.createQueryBuilder()
                .update()
                .set({uidCategory: req.body.asign})
                .where('uidProduct = :id', {id: req.body.uid})
                .execute().then(r => res.json({data: true})).catch(e => res.json({err: 'No se pudo cambiar de categoria'}));
        } else {
            res.json({err: 'Seleccione una Opsion'});
        }
    }

    createCateory(req: Request, res: Response): void {
        if(req.body.name) {
            const c = new CategoryEntity();
            c.name = req.body.name;
            c.save().then(r => {
                if(req.body.id) {
                    ProductsEntity.createQueryBuilder()
                        .update()
                        .set({uidCategory: r.uidCategory})
                        .where('uidProduct = :id', {id: req.body.id})
                        .execute().then(()=> res.json({data: true})).catch(e => res.json({data: true, err: 'No se pudo Asignar'}));
                }
            }).catch(e => res.json({err: 'No se pudo crear la Categoria'}));
        } else {
            res.json({err: 'Rellene los Datos'});
        }
    }

    getBasicInfo(id: string): Promise<getBasicInfoInterface>{
        return new Promise((res,err)=> {
            ProductsEntity.findOne({
                select: ['uidProduct', 'name', 'description', 'price', 'uidCategory'],
                where: {
                    uidProduct: id
                }
            }).then(s => {
                res({
                    id: s?.uidProduct,
                    title: s?.name,
                    description: s?.description,
                    price: s?.price as (number | undefined),
                });
            }).catch(e => err(e));
        });
    }
    getAllCategory(): Promise<getAllCategory[]>{
        return new Promise((res, err)=> {
            CategoryEntity.find({
                select: ['uidCategory', 'name']
            }).then(s => {
                let data: getAllCategory[] = [];
                s.forEach((x, i) => {
                    data.push({
                        name: x.name,
                        value: x.uidCategory
                    })
                })
                res(data);
            }).catch(e => err(e));
        });
    }
}

interface getAllCategory{
    name?: string;
    value?: string;
}
interface getBasicInfoInterface {
    id?: string;
    title?: string;
    description?: string;
    price?: number;
}