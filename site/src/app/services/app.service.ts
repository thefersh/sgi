import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetProductinfoInterface, GetProductFeacturesInterface, GetProductGaleryInterface, GetTrendsInterface } from '../interface/app.service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private dom: DomService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  getTrends(): Promise<GetTrendsInterface[]> {
    return new Promise((res, err) => {
      this.http.get<{data: GetTrendsInterface[], err: string}>('/api/v1/app/trends', {headers: this.auth.getHeaders()})
        .subscribe(s => {
          if(s.err) {
            this.dom.notification(s.err);
            err();
          }else{
            res(s.data);
          }
        });
    });
  }

  getProductCountStock(id: string): Promise<number> {
    return new Promise((res, err) => {
      this.http.get<{data: number, err: string}>(`/api/v1/app/p/${id}/stock`, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
            err();
          }else {
            res(r.data);
          }
        });
    });
  }

  updateDescription(value: string, id: string): Promise<any> {
    return new Promise((res, err) => {
      this.http.patch<{data: boolean, err: string}>(`/api/v1/app/p/${id}/description`, {data: value}, {headers: this.auth.getHeaders()})
        .subscribe(r => {
          if (r.err) {
            this.dom.notification(r.err);
            err();
          }else{
            this.dom.notification('Se Realizaron los Cambios');
            res();
          }
        });
    });
  }

  createProductGalery(file: FormData, id: string): Observable<HttpEvent<{data: GetProductGaleryInterface[], err: string}>>{
    return this.http.post<{data: GetProductGaleryInterface[], err: string}>(`/api/v1/app/p/${id}/galery`, file, {
      headers: this.auth.getHeaders(),
      reportProgress: true,
      observe: 'events'
    });
  }

  getProductGalery(id: string): Promise<GetProductGaleryInterface[]> {
    return new Promise((res, err) => {
      this.http.get<{data: GetProductGaleryInterface[], err: string}>(`/api/v1/app/p/${id}/galery`, { headers: this.auth.getHeaders()})
        .subscribe(re => {
          if (re.err){
            this.dom.notification(re.err);
            err();
          }else {
            res(re.data);
          }
        });
    });
  }

  createProductFeactures(data: any[], id: string): Promise<GetProductFeacturesInterface[]>{
    return new Promise((resolve, err) => {
      this.http.post<{data: GetProductFeacturesInterface[], err: string}>(
        `/api/v1/app/p/${id}/feactures`,
        { feactures: data },
        { headers: this.auth.getHeaders()}
      ).subscribe(res => {
        if (res.err) {
          this.dom.notification(res.err);
          err();
        }else {
          resolve(res.data);
        }
      });
    });
  }

  getProductFeactures(idProduct: string): Promise<GetProductFeacturesInterface[]>{
    return new Promise(res => {
      this.http.get<{data: GetProductFeacturesInterface[], err: string}>(
        `/api/v1/app/p/${idProduct}/feactures`,
        {headers: this.auth.getHeaders()}
      ).subscribe(s => {
          if (s.data){
            res(s.data);
          }else {
            res([]);
            this.dom.notification(s.err);
          }
        });
    });
  }

  getProductOutstandingImage(idProduct: string): Promise<string>{
    return new Promise(res => {
      this.http.get<{data: string, err: string}>(`/api/v1/app/p/${idProduct}/img`, {headers: this.auth.getHeaders()})
        .subscribe(s => {
          if (s.data){
            res(s.data);
          }else {
            res('');
            this.dom.notification(s.err);
          }
        });
    });
  }

  getProductinfo(idProduct: string): Promise<GetProductinfoInterface> {
    return new Promise(res => {
      this.http.get<{data: GetProductinfoInterface, err: string}>(`/api/v1/app/p/${idProduct}/info`, {headers: this.auth.getHeaders()})
        .subscribe(s => {
          if (s.data){
            res(s.data);
          }else {
            this.dom.notification(s.err);
            this.router.navigate(['/']);
          }
        });
    });
  }
}

