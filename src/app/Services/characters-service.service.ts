import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Md5} from "md5-typescript";
import { Character, Comics, listCharacters } from "src/app/Entities/ListCharacters"

@Injectable({
  providedIn: 'root'
})
export class CharactersServiceService {

  url = environment.url;
  publicKey = environment.publicKey;
  privateKey = environment.privateKey;
  listCharacter : Character[] = [];
  listComics : Comics[] = [];

  constructor(private http:  HttpClient) { }

  listCharacters(offset?: number, limit?: number, characterName?: string, creationTime: Date = new Date()): Observable<listCharacters>{
    console.log(characterName)
    var creationTimeParam = "&modifiedSince="+ creationTime; 
    var characterNameParam = characterName != "" ? "&nameStartsWith=" + characterName: "";
    var params = "limit="+ limit + "&offset=" + offset + creationTimeParam + characterNameParam ;
    var requestUrl = this.getUrl("/v1/public/characters", params);
    console.log(requestUrl)
    return this.http.get<any>(requestUrl);
  }

  getUrl(url:string, params: string): string{
    var timeStamp = Date.now();
    var hash = Md5.init(timeStamp + this.privateKey + this.publicKey );
    return this.url+url+"?ts="+timeStamp+"&hash="+hash+"&apikey="+this.publicKey+ "&" + params;
  }

  saveComic(character?: Comics) {
    if(character != undefined){
      this.listComics.push(character);
    }
  }

  getFavoriteComics() {
    return this.listComics;
  }

  // checkFavoritesComics(character?: Comics) {
  //   if(character != undefined){
  //      var char = this.listComics.find(x=> x.id == character.id);
  //     if(char != undefined){
  //       return true; 
  //     }
  //   }
  //   return false;
  // }

  // deleteFavoritesComics(character?: Comics) {
  //   if(character != undefined){
  //     this.listComics = this.listComics.filter(x=> x. != character.id);
  //   }
  // }
  
  saveCharacters(character?: Character) {
    if(character != undefined){
      this.listCharacter.push(character);
    }
  }

  getFavoriteCharacters() {
    return this.listCharacter;
  }

  checkFavorites(character?: Character) {
    if(character != undefined){
       var char = this.listCharacter.find(x=> x.id == character.id);
      if(char != undefined){
        return true; 
      }
    }
    return false;
  }

  deleteFavorites(character?: Character) {
    if(character != undefined){
      this.listCharacter = this.listCharacter.filter(x=> x.id != character.id);
    }
  }
}
