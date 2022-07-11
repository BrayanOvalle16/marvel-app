import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'md5-typescript';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Comic } from '../Entities/Comic';
import { Comics } from '../Entities/ListCharacters';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  url = environment.url;
  publicKey = environment.publicKey;
  privateKey = environment.privateKey;
  listComics : Comic[] = [];
  
  constructor(private http:  HttpClient) { }

  getComic(url: string): Observable<any> {
      var requestUrl = this.getUrl(url, "");
      return this.http.get<any>(requestUrl); 
  }

  getUrl(url:string, params: string): string{
    var timeStamp = Date.now();
    var hash = Md5.init(timeStamp + this.privateKey + this.publicKey );
    return url+"?ts="+timeStamp+"&hash="+hash+"&apikey="+this.publicKey+ "&" + params;
  }

  saveComic(character?: Comic) {
    console.log(character)
    this.listComics = this.getFavoriteComics();
    if(character != undefined){
      this.listComics.push(character);
      localStorage.setItem('comics', JSON.stringify(this.listComics));
    }
  }

  getFavoriteComics() {
    var res = localStorage.getItem("comics");
    if(res != null) {
      return JSON.parse(res);
    }
    return [];
  }

  checkFavoritesComics(character?: Comic) {
    this.listComics = this.getFavoriteComics();
    console.log(this.listComics);
    console.log(character);
    if(character != undefined){
       var char = this.listComics.find(x=> x.id == character.id);
       console.log(character)
      if(char != undefined){
        return true; 
      }
    }
    return false;
  }

  deleteFavoritesComics(character?: Comic) {
    this.listComics = this.getFavoriteComics();
    if(character != undefined){
      this.listComics = this.listComics.filter(x => x.id != character.id);
      localStorage.setItem('comics', JSON.stringify(this.listComics));
    }
  }
}
