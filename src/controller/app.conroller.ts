import { Router } from 'express';
import { ProductsEntity } from '../entity/data/product.entity';
import { FeacturesEntity } from '../entity/data/feactures.entity';
import { AssetsEntity } from '../entity/data/assets.entity';
import multer from 'multer';
import { resolve, extname } from 'path';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import { ItemEntity } from '../entity/data/item.entity';

const m = multer({
    storage: multer.diskStorage({
        destination: resolve(process.cwd(), './uploads/media'),
        filename: (req, file, cb) => {
            cb(null, `${uuid()}.${(new Date()).getTime()}${extname(file.originalname)}`)
        }
    })
})

const app = Router();

/** Product: Retorna el estado del stock */
app.get('/p/:id/stock', (req, res)=> {
    ItemEntity.count({uidProduct: req.params.id, isSold: 0}).then(r => res.json({data: r})).catch(e => res.json({err: 'No se pudo Obtener el estado del Stock'}));
});

/** Product: Cambia la descripsion de un product */
app.patch('/p/:id/description', (req, res) => {
    if(req.body.data) {
        ProductsEntity.createQueryBuilder()
            .update()
            .set({
                description: req.body.data as string
            }).where('uidProduct = :id', {id: req.params.id})
            .execute()
            .then(() => res.json({data: true})).catch(e => res.json({err: 'Ubo un error al guardar los cambios'}));
    } else {
        res.json({err: 'Completa los datos Correctamente'});
    }
});

/** Product: sube una nueva imagen */
app.post('/p/:id/galery', m.single('file'), (req, res) => {
    AssetsEntity.createQueryBuilder()
        .insert()
        .values([{
            uidProduct: req.body.id || '',
            service: 'local',
            name: req.body.name || '',
            bucket: '/media',
            route: req.file.filename,
            type: req.file.mimetype
        }])
        .execute().then(r => {
            let id: string[] = []
            r.identifiers.forEach(x => id.push(x.uidAsset));
            AssetsEntity.findByIds(id).then(r => {
                let data: any[] = [];
                if (req.body.default) {
                    ProductsEntity.createQueryBuilder()
                        .update()
                        .set({
                            img: `/media/${r[0].route}`
                        })
                        .where({
                            uidProduct: req.body.id
                        })
                        .execute().then(console.log).catch(console.log);
                }
                r.forEach(x => data.push({
                    id: x.uidAsset,
                    alt: x.name,
                    url: `/media/${x.route}`,
                    type: x.type,
                    default: req.body.default !== undefined
                }));
                res.json({data});
            }).catch(E => res.json('Se ingreso correctamente, pero no se pudo obtener los datos'));
        }).catch(e => res.json({err: 'ing'}));
});

/** Product: Obtiene la url de las imagenes */
app.get('/p/:id/galery', (req, res) => {
    AssetsEntity.find({
        select: ['uidAsset', 'name', 'bucket', 'route'],
        where: {
            uidProduct: req.params.id
        }
    }).then(r => {
        let data: any[] = [];
        r.forEach(x => data.push({
            id: x.uidAsset,
            alt: x.name,
            url: `/media/${x.route}`,
            type: x.type,
            default: false
        }));
        res.json({data});
    }).catch(e => res.json({err : 'No se pudo encontrar las imagenes'}));
});

/** Product: Crea nuevas caracteristicas */
app.post('/p/:id/feactures', (req, res) => {
    if (req.body.feactures){
        FeacturesEntity.createQueryBuilder()
            .insert()
            .values(req.body.feactures)
            .execute().then(r => {
                let id: string[] = [];
                r.identifiers.forEach(x => id.push(x.uidFeactures));
                FeacturesEntity.findByIds(id).then(s => {
                    let data: any[]= [];
                    s.forEach(x => data.push({
                        id: x.uidProduct,
                        name: x.name,
                        value: x.value,
                        edit: false
                    }));
                    res.json({data});
                }).catch(e => res.json('Se ingreso correctamente los datos, pero no se pudo recuperar. Intente mas tarde'));
            }).catch(e => res.json({err: 'No se Pudo ingresar las caracteristicas'}));
    } else {
        res.json({err: 'Rellene los datos Correctamente'});
    }
});

/** Product: Obtiene todas las caracteristicas */
app.get('/p/:id/feactures', (req, res) => {
    FeacturesEntity.find({
        select: ['uidFeactures', 'name', 'value'],
        where: {
            uidProduct: req.params.id
        }
    }).then(r => {
        let data: any[] = [];
        r.forEach(x => {
            data.push({
                name: x.name,
                value: x.value,
                id: x.uidFeactures,
                edit: false
            });
        });
        res.json({data});
    }).catch(e => res.json({err: 'No se pudo obtener las Caracteristicas'}));
});

/** Product: Obtiene la imagen destacada */
app.get('/p/:id/img', (req, res) => {
    ProductsEntity.findOne({
        select: ['img'],
        where: {
            uidProduct: req.params.id
        }
    }).then(r => res.json({data: r?.img === '' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAQAAABh3xcBAAAEPElEQVR42u3TQQ0AAAjEME4T/i2giSceSCthydJTwHMxOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHSjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORhcBjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDpgdDA6YHTA6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRAaOD0QGjA0YHjA4YHTA6YHTA6GB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRjQ5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhjd6GB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9FFAKMDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdDA6YHTA6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaOD0QGjA0YHjA4YHTA6YHTA6GB0wOiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHzgJSEvf4VkBPrgAAAABJRU5ErkJggg==" : r?.img})).catch(e => res.json({err: 'No se encuentra la Imagen Destacada'}));
});

/** Product: Obtiene el nombre y la descripsion */
app.get('/p/:id/info', (req, res)=> {
    ProductsEntity.find({
        select: ['name', 'description'],
        where: {
            uidProduct: req.params.id
        }
    }).then(r => r.length !== 0 ? res.json({data: r[0]}) : res.json({err: 'No se encuentra'})).catch(e => res.json({err: 'No se encuentra'}))
});

export default app;
