import { Router } from 'express';

const add = Router();

add.get('/product', (req, res) => res.render('page/productAdd', {title: 'Añadir Producto'}));


export default add;
