import Express from 'express';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import { hbs } from './lib/handlebars';

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
    app.use(Express.static(resolve(process.cwd(), 'static')));
    app.get('/', (req, res) => res.render('index'));
    
    app.listen(process.env.PORT || 3000 , () => console.log('server Start on port 3000'));
})();