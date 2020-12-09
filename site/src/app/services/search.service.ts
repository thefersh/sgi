import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { DomService } from './dom.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private dom: DomService
  ) { }

  search(data: any): Promise<any[]>{
    return new Promise ((res, err) => {
      this.http.post<{data: any[]}>('/api/v1/search', data, {headers: this.auth.getHeaders()}).subscribe(r => {
        if (r.data) {
          res(r.data);
        } else {
          this.dom.notification('Hubo un problema al Buscar');
          err();
        }
      });
    });
  }
}
