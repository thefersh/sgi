import { getManager } from 'typeorm';
import { ProductsEntity } from '../entity/data/product.entity';
import { CategoryEntity } from '../entity/data/category.entity';

export class ProductService {

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