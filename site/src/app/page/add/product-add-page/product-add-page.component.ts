import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.scss']
})
export class ProductAddPageComponent implements OnInit {

  constructor(
    private dom: DomService
  ) {
    this.dom.page.title.text = 'Añadir Producto';
    this.dom.page.title.redirect = '/add';
    this.dom.page.menu.add = false;
  }

  ngOnInit(): void {
  }

}
