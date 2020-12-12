import Express from 'express';
import { resolve } from 'path';
import cookie from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { existsSync } from 'fs';

import routerApiV1 from './router';
import { createConnections } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { UserEntity } from './entity/data/user.entity';
import { AssetsEntity } from './entity/data/assets.entity';
import { ProductsEntity } from './entity/data/product.entity';
import { CategoryEntity } from './entity/data/category.entity';
import { FeacturesEntity } from './entity/data/feactures.entity';
import { ItemEntity } from './entity/data/item.entity';

dotenv.config();

(function serverStart() {
    const mysqlBase: MysqlConnectionOptions = {
        type: 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
		port: (<number>process.env.DB_PORT) || 3306
    }; 
    createConnections([{
        name: 'default',
        ...mysqlBase,
        database: process.env.DB_DATABASE_DATA || 'data',
        synchronize: true,
        entities: [
            UserEntity,
            AssetsEntity,
            ProductsEntity,
            CategoryEntity,
            FeacturesEntity,
            ItemEntity
        ]
    }, {
        name: 'logs',
        ...mysqlBase,
        database: process.env.DB_DATABASE_LOG || 'logs',
        synchronize: true,
        entities: []
    }]).then( c => {
        const app = Express();

        app.use(cookie());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(Express.static(resolve(process.cwd(), 'static')));
        app.get('/media/:name', (req, res) => {
            if (existsSync(resolve(process.cwd(), 'uploads/media',req.params.name))) {
                res.sendFile(resolve(process.cwd(), 'uploads/media',req.params.name));
            }else {
                res.json({
                    err: 'El Archivo no existe'
                })
            }
        })
        app.use('/api/v1', routerApiV1);
        app.get('**', (req, res) => res.sendFile(resolve(process.cwd(), 'static/index.html')));
        app.get('/', (req, res) => res.sendFile(resolve(process.cwd(), 'static/index.html')));
        
        app.listen(process.env.PORT || 3000 , () => console.log('server Start on port 3000'));
    }).catch(e => {
        const app = Express();
		console.log(e);
        app.get('/', (req, res)=> res.json({err: 'base de datos', detall: e}));
        app.listen(process.env.PORT || 3000 , () => console.log('server Start on port 3000 {DATABASE}'));
    })
})();