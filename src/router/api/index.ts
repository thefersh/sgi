import { Router } from 'express';
import { Auth } from '../../lib/auth';
import AuthControllerV1 from '../../controller/auth.controller.v1';

const v1 = Router();
const auth = new Auth();


v1.get('/', auth.AuthMidlewareApi, (req, res) => res.json('hola api'));
v1.use('/auth/', AuthControllerV1);

export default v1;