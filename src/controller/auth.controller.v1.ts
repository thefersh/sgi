import { Auth } from "../lib/auth";
import { Application, Router, Request, Response } from "express";
import { UserEntity } from "../entity/data/user.entity";
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
const auth = Router();

auth.post('/login', (req, res)=> {
    if (req.body.flogine && req.body.floginp){
        UserEntity.find({
            select: ['uid', 'password'],
            where: {
                email: req.body.flogine
            },
            take: 1
        }).then(r => {
            if (compareSync(req.body.floginp, r[0].password)) {
                res.json({
                    data: sign({
                        id: r[0].uid
                    }, process.env.JSON_KEY as string, { expiresIn: process.env.JSON_EXPIRE})
                });
            }else {
                res.status(403).json({err: 'Los datos no son Validos'});
            }
        }).catch(e => res.status(403).json({err: 'Los datos no son validos'}));
    }else {
        res.status(403).json({err: 'Datos Incompletos'});
    }
});

/*
auth.get('/user', (req, res) => {
    const user = new UserEntity();
    user.name = 'fernando';
    user.lastName = 'ticona';
    user.email = 'thefersh24@gmail.com',
    user.password = hashSync('test', genSaltSync(12));
    user.save().then(res.json);
})
*/

export default auth; 