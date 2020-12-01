import { Router } from 'express';
import { Auth } from '../../lib/auth';

import AddRouter from './../../controller/web/add.controller.web';
import ProductRouter from './../../controller/web/product.controller';

const v1 = Router();
const auth = new Auth();

v1.get('/', auth.AuthMidleware, (req, res) => res.render('index'));
v1.use('/add', auth.AuthMidleware, AddRouter);
v1.use('/product', auth.AuthMidleware, ProductRouter);

v1.get('/login', (req, res) => res.render('auth/login'));

export default v1;