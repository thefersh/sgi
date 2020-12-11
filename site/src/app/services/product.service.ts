import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomService } from './dom.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { GetInfoInterface, GetCategoryInterface, FeacturesExistItemInterface, FeacturesExistItemRequestInterface } from '../interface/product.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private dom: DomService,
    private auth: AuthService,
    private router: Router
  ) { }

  deleteFeacture(id: string, name: string): Promise<void> {
    return new Promise((res, err) => {
      if (confirm(`Esta seguro de Eliminar la propiedad "${name}"`)){
        this.http.delete<{data: boolean, err: string}>(`/api/v1/product/feactures?id=${id}`, {headers: this.auth.getHeaders()})
          .subscribe(r => {
            if (r.data) {
              this.dom.notification(`Se elimino la propiedad "${name}" correctamente.`);
              res();
            }else {
              this.dom.notification(r.err);
              err();
            }
          });
      }else {
        err();
      }
    });
  }

  changeFeactures(id: string, data: any): Promise<void> {
    return new Promise((res, err) => {
      if (Object.keys(data).length !== 0) {
        this.http.patch<{data: boolean, err: string}>('/api/v1/product/feactures', {
          id,
          ...(data.name ? {name: data.name} : {}),
          ...(data.value ? {value: data.value} : {})
        }, {headers: this.auth.getHeaders()}).subscribe(r => {
          if (r.data) {
            this.dom.notification('Cambios Realizados');
            res();
          }else {
            this.dom.notification(r.err);
            err();
          }
        });
      }else {
        res();
      }
    });
  }

  getFeactures(id: string): Promise<FeacturesExistItemInterface[]> {
    return new Promise(res => {
      this.http.get<{data: FeacturesExistItemRequestInterface[], err: string}>(
        '/api/v1/product/feactures?id=' + id,
        {
          headers: this.auth.getHeaders()
        }).subscribe(r => {
        if (r.err) {
          this.dom.notification(r.err);
        }else {
          // tslint:disable-next-line: prefer-const
          let data: FeacturesExistItemInterface[] = [];
          for (let x = 0; r.data.length > x; x++){
            data.push({
              id: r.data[x].uidFeactures,
              name: r.data[x].name,
              value: r.data[x].value,
              isEdit: false
            });
          }
          res(data);
        }
      });
    });
  }

  submitFeacturesNew(data: any, uid: string, id?: string, ): Promise<void> {
    return new Promise((res) => {
      this.http.post<{data: boolean, err: string}>(`/api/v1/product/feactures`, {feactures: data}, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
          }
          if (r.data) {
            this.dom.notification(`Se cambio de Categoria`);
            this.router.navigate([id === '' ? `/product/${uid}/media` : `/product/${uid}`], {
              queryParams: {
                ...(id === '' ? { complete: true, type: 'media'} : {})
              }
            });
          }
          res();
        });
    });
  }

  slelectCategory(data: any, id?: string): Promise<void> {
    return new Promise((res) => {
      this.http.patch<{data: boolean, err: string}>(`/api/v1/product/set/category`, {...data, uid: id}, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
          }
          if (r.data) {
            this.dom.notification(`Se cambio de Categoria`);
            this.router.navigate([data.id ? `/product/${id}/set` : `/product/${id}`], {
              queryParams: {
                ...(data.id ? { complete: true, type: 'feactures'} : {})
              }
            });
          }
          res();
        });
    });
  }

  createCategory(data: any, id?: string): Promise<void> {
    return new Promise((res) => {
      this.http.post<{data: boolean, err: string}>(`/api/v1/product/category`, data, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
          }
          if (r.data) {
            this.dom.notification(`${data.name} se Creo${!r.err && data.id ? ' y Asigno' : ''} Correctamente`);
            this.router.navigate([data.id ? `/product/${id}/set` : `/product/${id}`], {
              queryParams: {
                ...(data.id ? { complete: true, type: 'feactures'} : {})
              }
            });
          }
          res();
        });
    });
  }

  getCategory(): Promise<GetCategoryInterface[]> {
    return new Promise((res) => {
      this.http.get<{data: GetCategoryInterface[], err: string}>(`/api/v1/product/category`, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.data) {
            res(r.data);
          }else {
            res([]);
            this.dom.notification(r.err);
          }
        });
    });
  }

  getInfo(id: string): Promise<GetInfoInterface> {
    return new Promise((res, err) => {
      this.http.get<{data: GetInfoInterface, err: string}>(`/api/v1/product?type=basicInfo&id=${id}`, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.data) {
            res(r.data);
          } else {
            err();
            this.dom.notification(r.err);
          }
        });
    });
  }

  createProduct(data: any): Promise<void> {
    return new Promise(res => {
      this.http.post<any>('/api/v1/product/add/base', {...data}, {headers: this.auth.getHeaders()}).subscribe(r => {
        if (r.data) {
          this.router.navigate([`/product/${r.data}/set`], {
            queryParams: {
              iscreated: true,
              type: 'category',
              complete: true,
            }
          });
          res();
        }else {
          this.dom.notification(r.err);
          res();
        }
      });
    });
  }

}

