import { Router } from 'express';
import { Auth } from '../../lib/auth';

const v1 = Router();
const auth = new Auth();

v1.get('/', auth.AuthMidleware, (req, res) => res.render('index'));
v1.get('/login', (req, res) => res.render('auth/login'));

export default v1;