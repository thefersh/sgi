import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(
    private dom: DomService
  ) {
  }

  ngOnInit(): void {
    console.log(this.dom.getParams.search_query);
  }

}
