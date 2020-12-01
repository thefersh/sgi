import { Router } from 'express';
import { ProductService } from '../../services/product.service';


const product = Router();
const p = new ProductService;

product.get('/:id/set', (req, res) => {
    p.getBasicInfo(req.params.id).then(r => {
        res.render('page/productSet', {
            title: `${r.title}- Cambiar Categoria`,
            navbar: {
                title: { 
                    text: r.title,
                    redirect: `/product/${r.id}`
                } 
            },
            product: r,
            type: {
                ...(req.query.type === 'category' ? {category: true} : {}),
                ...(req.query.type === 'features' ? {features: true} : {}),
            }
        });
    }).catch(e => {
        res.render('404', { page: req.originalUrl })
    });
    
});

// el problema es que no puedo establecer type: {} sin que lo lea hbs como existente
export default product;
