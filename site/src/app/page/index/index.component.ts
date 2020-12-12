import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { GetTrendsInterface, GetErrorInterface } from 'src/app/interface/app.service.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  cardClient = 123;
  cardSallerMonth = 123;
  cardSallerToday = 123;

  trends: GetTrendsInterface[] = [];

  errors: GetErrorInterface[] = [];

  constructor(
    private dom: DomService
  ) {
    this.dom.page.title.text = 'SGI';
    this.dom.page.title.redirect = '/';
    this.dom.page.menu.add = true;
    this.dom.page.menu.profile = true;
  }

  ngOnInit(): void {
    document.title = ('Sistema de Gestion de Inventario');
    Array.from(Array(10), (_, i) => i + 1).forEach((x, i) => {
      this.trends.push({
        id: 'idproduct',
        name: 'name product',
        seller: (120 - (10 * i))
      });
    });

    this.errors = [
      {id: 'idproduct', name: 'name product', type: 'stock'},
      {id: 'idproduct', name: 'name product', type: 'stock'},
      {id: 'idproduct', name: 'name product', type: 'stock'},
    ];
  }

  errorSolveTypeStock(id: string): void{
    console.log('camiar stock ' + id);
  }

}
