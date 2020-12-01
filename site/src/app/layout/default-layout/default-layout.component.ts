import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(
    public dom: DomService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.auth.logout();
  }

}
