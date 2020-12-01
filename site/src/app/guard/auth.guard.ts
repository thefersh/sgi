import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DomService } from '../services/dom.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  query: any;
  constructor(private router: Router, private dom: DomService){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('authorization')) {
      return true;
    }else {
      this.router.navigate(['/login'], {
        queryParams: {
          next: window.location.pathname,
          query: JSON.stringify(this.dom.getParams)
        }
      });
      return false;
    }
  }
  getCookie(name: string): any {
        const ca: Array<string> = document.cookie.split(';');
        const cookieName = name + '=';
        let c: string;

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < ca.length; i += 1) {
            if (ca[i].indexOf(name, 0) > -1) {
                c = ca[i].substring(cookieName.length + 1, ca[i].length);
                return c;
            }
        }
        return '';
  }
}
