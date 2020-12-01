import Express from 'express';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import { hbs } from './lib/handlebars';
import cookie from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import routerApiV1 from './router/api';
import routerWebV1 from './router/web';
import { createConnections } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { UserEntity } from './entity/data/user.entity';
import { AssetsEntity } from './entity/data/assets.entity';
import { ProductsEntity } from './entity/data/product.entity';
import { CategoryEntity } from './entity/data/category.entity';
import { FeacturesEntity } from './entity/data/feactures.entity';

dotenv.config();

(function serverStart() {
    const mysqlBase: MysqlConnectionOptions = {
        type: 'mysql',
        host: '127.0.0.1',
        username: 'root',
        password: ''
    }; 
    createConnections([{
        name: 'default',
        ...mysqlBase,
        database: 'data',
        synchronize: true,
        entities: [
            UserEntity,
            AssetsEntity,
            ProductsEntity,
            CategoryEntity,
            FeacturesEntity
        ]
    }, {
        name: 'logs',
        ...mysqlBase,
        database: 'logs',
        synchronize: true,
        entities: []
    }]).then( c => {
        const app = Express();
        
        app.set("view engine", "hbs");
        app.set("views", resolve(process.cwd(), "views"));
        app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: resolve(app.get('views'), 'layouts'),
            partialsDir: resolve(app.get('views'), 'partials'),
            extname: '.hbs',
            helpers: hbs
        }))
        app.use(cookie());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(Express.static(resolve(process.cwd(), 'static')));
        
        app.use('/', routerWebV1);
        app.use('/api/v1', routerApiV1);
        
        app.listen(process.env.PORT || 3000 , () => console.log('server Start on port 3000'));
    }).catch(e => {
        const app = Express();
        app.get('/', (req, res)=> res.json({err: 'base de datos', detall: e}));
        app.listen(process.env.PORT || 3000 , () => console.log('server Start on port 3000 {DATABASE}'));
    })
})();