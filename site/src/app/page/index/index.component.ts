import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { GetTrendsInterface, GetErrorInterface } from 'src/app/interface/app.service.interface';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AppService } from 'src/app/services/app.service';

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
    private dom: DomService,
    private app: AppService
  ) {
    this.dom.page.title.text = 'SGI';
    this.dom.page.title.redirect = '/';
    this.dom.page.menu.add = true;
    this.dom.page.menu.profile = true;
  }

  ngOnInit(): void {
    this.app.getTrends().then(d => this.trends = d);
    document.title = ('Sistema de Gestion de Inventario');
  }

  errorSolveTypeStock(id: string): void{
    console.log('camiar stock ' + id);
  }

}
