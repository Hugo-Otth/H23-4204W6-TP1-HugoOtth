import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  result = false;
  chansons = false;
  artist : string = "";
  Albums : Album[] = [];
  albumSelect : string = "";
  Chansons : Chanson[] = [];
  api_key : string ="9a8a3facebbccaf363bb9fd68fa37abf";
  constructor(public http : HttpClient){}

  searchAlbums():void{
    this.request();
    this.result = true;
    this.chansons = false;
  }

  searchChansons(inputAlbum : string):void{
    this.requestChansons(inputAlbum);
    this.albumSelect = inputAlbum;
    this.result = false;
    this.chansons = true;
  }

  backward():void{
    this.chansons = false;
    this.result = true;
  }

	async request() : Promise<void>{
    let input = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.artist + "&api_key=" + this.api_key + "&format=json"));
    this.Albums = [];
    for(let album of input.topalbums.album){
      let a : Album = new Album(album.name, album.image[3]["#text"]);
      this.Albums.push(a);
    }
  }
  
  async requestChansons(inputAlbum : string) : Promise<void>{
    let input = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + this.api_key + "&artist=" + this.artist + "&album=" + inputAlbum + "&format=json"));
    this.Chansons = [];
    let tracklist = input.album.tracks.track;
    if(Array.isArray(tracklist)){
      for(let chanson of input.album.tracks.track){
        let c : Chanson = new Chanson(chanson.name);
        this.Chansons.push(c);
      }
    }else{
      let c : Chanson = new Chanson(input.album.tracks.track.name)
      this.Chansons.push(c);
    }
  }

  newSearch():void{
    this.result = false;
    this.chansons = false;
  }
}

export class Album {
  nom : string = "";
  image : string = "";

  constructor(nomInput : string, imageInput : string){
    this.nom = nomInput;
    this.image = imageInput;
  }
}

export class Chanson {
  titre : string = "";

  constructor(titreInput : string){
    this.titre = titreInput;
  }
}
