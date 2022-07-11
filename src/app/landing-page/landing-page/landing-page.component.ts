import { Component, OnInit } from '@angular/core';
import { CharactersServiceService } from 'src/app/Services/characters-service.service';
import { FormsModule } from '@angular/forms';
import { Character } from 'src/app/Entities/ListCharacters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  title = 'marvel-app';
  paginatorOffset: number = 0;
  listCharacters: any;
  creationTime: Date = new Date();
  characterName: string = "";
  modal = true;
  Charactersa: any;
  favorites = false;
  constructor(private http: CharactersServiceService, private router: Router) {}
  
  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters( ) {
    if(this.favorites) {
      this.listCharacters = this.http.getFavoriteCharacters();
    } else {
      this.http.listCharacters(this.paginatorOffset*10, 10, this.characterName, this.creationTime).subscribe(res => {
        this.listCharacters = res.data.results;
        console.log(this.listCharacters)
      })
    }
  }

  paginator(offset: number) {
    this.paginatorOffset += offset;
    this.getCharacters();
  }
}
