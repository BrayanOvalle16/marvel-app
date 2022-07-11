import { Component, Input, OnInit } from '@angular/core';
import { Character, listCharacters } from 'src/app/Entities/ListCharacters';
import { CharactersServiceService } from 'src/app/Services/characters-service.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComicsPageComponent } from '../comics-page/comics-page.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent  implements OnInit{
  faStar = faStar;
  favorite = false;
  hover : boolean = true;
  @Input() Character?: Character;
  constructor(private router: Router, private _snackBar: MatSnackBar, private service: CharactersServiceService) {
  }
  ngOnInit(): void {
    this.favorite  = this.service.checkFavorites(this.Character);
  }

  addFavorite() {
    if(!this.favorite){
      this._snackBar.open( this.Character?.name +" was saved on your favorites characters", "", {
        duration: 5000
      });
      this.service.saveCharacters(this.Character);
      this.favorite = true;
    } else {
      this._snackBar.open( this.Character?.name +" was removed from your favorites characters", "", {
        duration: 5000
      });
      this.service.deleteFavorites(this.Character);
      this.favorite = false;
    }

  }

  open() {
    this.router.navigate(['landing-page/character-info'], {state: { Character: this.Character}})
  }
}
