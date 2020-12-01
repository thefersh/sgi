import { readdirSync } from 'fs';
import { resolve } from 'path';
import { handlebars } from 'hbs';

export const hbs: Object = {
    ifObjectEmpty(data: object, opts: any){
        return Object.entries(data).length === 0 ? opts.fn(this): opts.inverse(this);
    },
    json: (data: string) => JSON.stringify(data),
    staticFilesCss: function () {
        const css = readdirSync(resolve(process.cwd(), 'static')).filter((e) => e.indexOf('css') !== -1);
        let data: string = '';
        css.forEach( x => data += `<link rel="stylesheet" href="/${x}">\n`);
        return new handlebars.SafeString(data);
    },
    staticFilesJs: function () {
        const js = readdirSync(resolve(process.cwd(), 'static')).filter((e) => e.indexOf('js') !== -1);
        let data: string = '';
        js.forEach( x => data += `<script src="/${x}" type="text/javascript"></script>\n`);
        return new handlebars.SafeString(data);
    } 
};