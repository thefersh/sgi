import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'sgi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;

  sidebar = false;
  search = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearch(v: boolean): void{
    this.search = v;
    if (typeof this.inputSearch !== 'undefined') {
      if (v) {
        this.inputSearch.nativeElement.focus();
        setTimeout(() => this.inputSearch.nativeElement.focus(), 250)
      }
    }
  }

}
