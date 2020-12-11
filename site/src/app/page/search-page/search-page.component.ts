import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { SearchService } from 'src/app/services/search.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  results: ReultsInterface[] = [];

  filter: FiltersInterface = {};
  filterSelect: SelectInterface[] = [
    {name: 'Productos', value: 'p'},
    {name: 'Clientes', value: 'c'},
    {name: 'Usuarios', value: 'u'}
  ];

  formFilterSelectType!: FormControl;
  constructor(
    private dom: DomService,
    private search: SearchService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private app: AppService,
  ) {
    document.title = `${this.dom.getParams.search_query} - Buscar en Sig`;

    /** Forms */
    this.formFilterSelectType = this.fb.control(['']);
  }

  ngOnInit(): void {
    this.searchData();
    this.formFilterSelectType.valueChanges.subscribe(v => {
      if (v !== null) {
          this.filter.type = v;
      }else {
          delete this.filter.type;
      }
      this.searchData();
    });
  }

  searchData(): void {
    this.search.search({
      query: this.dom.getParams.search_query,
      filter: JSON.stringify(this.filter)
    }).then(e => {
      e.forEach((x, i) => {
        this.results.push({
          id: x.id,
          name: x.name,
          type: x.type,
          priceComplete: x.priceComplete,
          priceFlat: x.priceFlat,
          img: this.sanitizer.bypassSecurityTrustResourceUrl(x.img)
        });
        this.app.getProductCountStock(x.id).then(r => this.results[i].stock = r !== 0).catch(() => this.results[i].stock = false);

      });
      this.results = e;
    });
  }

}

interface ReultsInterface extends ResultProductInterface, ResultUserInterface {
  id: string;
  name: string;
  type: 'product' | 'users';
  img: SafeUrl;
}

interface ResultUserInterface {
  role?: 'seller' | 'admin' | 'developer';
}

interface ResultProductInterface {
  priceComplete?: number;
  priceFlat?: number;
  stock?: boolean;
}

interface SelectInterface {
  name: string;
  value: string;
}

interface FiltersInterface {
  type?: string;
  page?: number;
}
