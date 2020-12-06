import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { IndexComponent } from './page/index/index.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { ViewProductComponent } from './page/product/view/view.component';
import { SetProductPageComponent } from './page/product/set-product-page/set-product-page.component';
import { DeleteProductPageComponent } from './page/product/delete-product-page/delete-product-page.component';
import { ProductAddPageComponent } from './page/add/product-add-page/product-add-page.component';
import { SearchPageComponent } from './page/search-page/search-page.component';

const routes: Routes = [
  {path: '', component: DefaultLayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', component: IndexComponent},
    {path: 'results', component: SearchPageComponent},
    {path: 'product', children: [
      {path: '', pathMatch: 'full', redirectTo: '/'},
      {path: ':id', children: [
        {path: '', component: ViewProductComponent},
        {path: 'set', component: SetProductPageComponent},
        {path: 'delete', component: DeleteProductPageComponent}
      ]}
    ]},
    {path: 'add/product', component: ProductAddPageComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
