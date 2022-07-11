import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { CharacterPageComponent } from './character-page/character-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ComicsPageComponent } from './comics-page/comics-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ComicsListComponent } from './comics-list/comics-list.component';
const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "character-info", component: CharacterPageComponent},
  { path: "comics", component: ComicsListComponent}
];

@NgModule({
  declarations: [
    ItemComponent,
    LandingPageComponent,
    CharacterPageComponent,
    ComicsPageComponent,
    ComicsListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [RouterModule]
})
export class LandingPageModule { }
