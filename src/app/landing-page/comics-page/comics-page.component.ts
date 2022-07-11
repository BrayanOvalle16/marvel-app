import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comic } from 'src/app/Entities/Comic';
import { CharactersServiceService } from 'src/app/Services/characters-service.service';
import { ComicsService } from 'src/app/Services/comics.service';
import { CharacterPageComponent } from '../character-page/character-page.component';

@Component({
  selector: 'app-comics-page',
  templateUrl: './comics-page.component.html',
  styleUrls: ['./comics-page.component.css']
})

export class ComicsPageComponent implements OnInit {

  comic?: Comic;
  isFavorite = false;
  constructor(public  http: ComicsService, public dialogo: MatDialogRef<ComicsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.getComic();
  }

  checkFavorite() {
    this.isFavorite = this.http.checkFavoritesComics(this.comic);
  }

  getComic() {
    this.http.getComic(this.data).subscribe(res =>{
      this.comic = res.data.results[0];
      this.checkFavorite();
  })
  }

  addFavorite() {
    this.http.saveComic(this.comic);
    this.isFavorite = true;
  }

  deleteFavorite() {
    this.http.deleteFavoritesComics(this.comic);
    this.isFavorite = false;
  }
}
