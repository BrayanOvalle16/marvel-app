import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './landing-page/item/item.component';

const routes: Routes = [
  {path: "landing-page", loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
