import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterial } from './angular.material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './page/login/login.component';
import { IndexComponent } from './page/index/index.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { ViewProductComponent } from './page/product/view/view.component';
import { SetProductPageComponent } from './page/product/set-product-page/set-product-page.component';
import { DeleteProductPageComponent } from './page/product/delete-product-page/delete-product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductAddPageComponent } from './page/add/product-add-page/product-add-page.component';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    IndexComponent,
    DefaultLayoutComponent,
    ViewProductComponent,
    SetProductPageComponent,
    DeleteProductPageComponent,
    ProductAddPageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterial,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
