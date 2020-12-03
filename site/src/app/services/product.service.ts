import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomService } from './dom.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { GetInfoInterface, GetCategoryInterface } from '../interface/product.service.interface';

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

  slelectCategory(data: any, id: string): Promise<void> {
    return new Promise((res) => {
      this.http.patch<{data: boolean, err: string}>(`/api/v1/product/set/category`, {...data, uid: id}, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
          }
          if (r.data) {
            this.dom.notification(`Se cambio de Categoria`);
            this.router.navigate([data.id ? `/product/${id}/set` : '/add/product'], {
              queryParams: {
                ...(data.id ? { complete: true, type: 'feactures'} : {})
              }
            });
          }
          res();
        });
    });
  }

  createCategory(data: any, id: string): Promise<void> {
    return new Promise((res) => {
      this.http.post<{data: boolean, err: string}>(`/api/v1/product/category`, data, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
          }
          if (r.data) {
            this.dom.notification(`${data.name} se Creo${!r.err && data.id ? ' y Asigno' : ''} Correctamente`);
            this.router.navigate([data.id ? `/product/${id}/set` : '/add/product'], {
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

