import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { LoginComponent } from './page/login/login.component';
import { Layoutv1Component } from './layout/layoutv1/layoutv1.component';
const routes: Routes = [
  {path: '', component: Layoutv1Component},
  {path: 'login', component: LoginComponent},
  {path: '**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
