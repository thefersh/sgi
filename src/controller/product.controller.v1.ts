import { Router } from 'express';
import { ProductsEntity } from '../entity/data/product.entity';
import { ProductService } from '../services/product.service';
import { ItemEntity } from '../entity/data/item.entity';

const productApi = Router();
const p = new ProductService;

productApi.post('/add/base', (req, res) => {
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
});

productApi.post('/category', p.createCateory); /** crea una categoria lo asigna a un producto */
productApi.get('/', (req, res)=> {
    if (req.query.type){
        switch(req.query.type){
            case 'basicInfo': 
            p.getBasicInfo(req.query.id as string).then(r => res.json({data: r})).catch(e => {
                console.log(e);
                res.json({err: 'No se encontro el Producto'})
                })
                break;
                default:
                    res.json({err: 'No se encuentra el dato'});
                    break;
                }
            }else {
                res.json({err: 'No se espesifico el dato'})
            }
        })
productApi.get('/category', (req, res) => p.getAllCategory().then(t => res.json({data: t})).catch(e => res.json({err: 'Hubo una falla en el servidor'})))
productApi.patch('/set/category', p.setCategory); /** cambia la categoria de un producto */

export default productApi;