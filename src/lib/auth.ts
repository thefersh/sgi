import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class Auth {
    /**
     * AuthMidleware
     */
    public AuthMidleware(req: Request, res: Response, next: NextFunction): void {
        if (!req.cookies.authorization || req.headers.authorization) {
            res.redirect('/login');
        }else{
            verify(req.cookies.authorization || req.headers.authorization, process.env.JSON_KEY as string, (err: any, data: any)=> {
                if(err) {
                    res.redirect('/login');
                }else {
                    next();
                }
            })
 
        }
    }


    /**
     * AuthMidlewareApi
     */
    public AuthMidlewareApi(req: Request, res: Response, next: NextFunction): void {
        if (!req.headers.authorization) {
            res.status(403).json({
                status: res.statusCode,
                err: 'Auth Requerid'
            })
        }else{
            verify(req.headers.authorization, process.env.JSON_KEY as string, (err: any, data: any)=> {
                if(err) {
                    res.status(403).json({
                        status: res.statusCode,
                        err: 'Auth Requerid'
                    })
                }else {
                    next();
                }
            })
 
        }
    }
}
