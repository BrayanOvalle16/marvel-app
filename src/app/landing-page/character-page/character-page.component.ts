import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Navigation, Router } from '@angular/router';
import { Character } from 'src/app/Entities/ListCharacters';
import { ComicsPageComponent } from '../comics-page/comics-page.component';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {

  Character?: Character;
  
  constructor(private router: Router, public dialog: MatDialog) {
    let nav = this.router.getCurrentNavigation();

    if (nav?.extras && nav.extras.state && nav.extras.state["Character"]) {
      this.Character = nav.extras.state["Character"] as Character;
    }
   }

   openDialog(url: string) {
    const dialogRef = this.dialog.open(ComicsPageComponent, {data: 
    url});
  }

  ngOnInit(): void {
  }

}
