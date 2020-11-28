import { NextFunction, Request, Response } from 'express';

export class Auth {
    /**
     * AuthMidleware
     */
    public AuthMidleware(req: Request, res: Response, next: NextFunction): void {
        if (!req.cookies.auth || req.headers.authorization) {
            res.redirect('/login');
        }
        next();
    }


    /**
     * AuthMidlewareApi
     */
    public AuthMidlewareApi(req: Request, res: Response, next: NextFunction): void {
        if (!req.cookies.auth || req.headers.authorization) {
            res.status(403).json({
                status: res.statusCode,
                err: 'Auth Requerid'
            })
        }
        next();
    }
}
