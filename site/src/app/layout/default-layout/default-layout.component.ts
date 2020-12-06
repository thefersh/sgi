import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  isSearch = false;
  formSearch!: FormGroup;

  constructor(
    public dom: DomService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.dom.getParams.search_query) {
      this.isSearch = true;
    }
    this.formSearch = this.fb.group({
      search: [this.dom.getParams.search_query || '']
    });
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.auth.logout();
  }

  submitFormSearch(): void {
    if (this.formSearch.value.search !== '') {
      /*
      this.router.navigate(['/results'], {
        queryParams: {
          search_query: this.formSearch.value.search
        }
      });*/
      window.location.href = `/results?search_query=${this.formSearch.value.search}`;
    }
  }

  resetReturnFormSearch(): void {
    this.isSearch = false;
    this.formSearch.reset();
  }

}
