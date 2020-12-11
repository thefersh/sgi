import { Router } from 'express';
import { Auth } from '../lib/auth';

import AuthControllerV1 from '../controller/auth.controller.v1';
import ProductControllerV1 from '../controller/product.controller.v1';
import searchControllerV1 from '../controller/search.controller.v1';
import AppControllerV1 from '../controller/app.conroller';

const v1 = Router();
const auth = new Auth();


v1.get('/', auth.AuthMidlewareApi, (req, res) => res.json('hola api'));
v1.use('/auth/', AuthControllerV1);
v1.use('/product', ProductControllerV1);
v1.use('/search', searchControllerV1);
v1.use('/app', AppControllerV1);

export default v1;