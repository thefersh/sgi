import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  getParams!: {[index: string]: any};
  page = {
    title: 'SGI'
  };
  constructor(
    private aRouter: ActivatedRoute,
    public matSnackBar: MatSnackBar
  ) {
    this.aRouter.queryParams.subscribe(s => this.getParams = s);
  }

  public notification(text: string): void{
    this.matSnackBar.open(text, '', {duration: 2000});
  }
}
