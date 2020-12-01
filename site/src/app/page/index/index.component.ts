import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

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

  }

}
