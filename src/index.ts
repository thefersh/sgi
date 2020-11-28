import Express from 'express';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import { hbs } from './lib/handlebars';
import cookie from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import routerApiV1 from './router/api';
import routerWebV1 from './router/web';

dotenv.config();

(function serverStart() {
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
    app.use(Express.static(resolve(process.cwd(), 'static')));
    
    app.use('/', routerWebV1);
    app.use('/api/v1', routerApiV1);
    
    app.listen(process.env.PORT || 3000 , () => console.log('server Start on port 3000'));
})();