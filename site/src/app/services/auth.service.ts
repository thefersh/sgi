import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomService } from './dom.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private dom: DomService
  ) { }

  login(data: any): Promise<string>{
    return new Promise(res => {
      this.http.post<any>('/api/v1/auth/login', data).subscribe(s => {
        if (s.data){
          localStorage.setItem('authorization', s.data);
          this.router.navigate([this.dom.getParams.next ? this.dom.getParams.next : '/'], {
            queryParams: {
              ...(this.dom.getParams.query ? JSON.parse(this.dom.getParams.query) : {})
            }
          });
        }else{
          alert('Datos Invalidos');
        }
        res();
      });
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.reload();
  }
}
