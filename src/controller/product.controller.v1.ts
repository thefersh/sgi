import { Router } from 'express';
import { ProductsEntity } from '../entity/data/product.entity';
import { ProductService } from '../services/product.service';

const productApi = Router();
const p = new ProductService;

productApi.post('/add/base', (req, res) => {
    if(req.body.fapName && req.body.fapPrice && req.body.fapDescription){
        const p = new ProductsEntity();
        p.name = req.body.fapName;
        p.price = req.body.fapPrice;
        p.description = req.body.fapDescription;
        p.uidCategory = 'off';
        p.save().then(r => {
            res.json({
                redirect: `/product/${r.uidProduct}/set?type=category`
            })
        }).catch(e => res.json({err: 'Ups... Hubo un error interno'}));
    }else {
        res.json({
            err: 'Rellene los datos.'
        });
    }
});

productApi.get('/category', (req, res) => p.getAllCategory().then(t => res.json(t)).catch(e => res.json({err: 'Hubo una falla en el servidor'})))

export default productApi;