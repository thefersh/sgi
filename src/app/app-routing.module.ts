import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiComponent } from './components/ui/ui.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ui', component: UiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
