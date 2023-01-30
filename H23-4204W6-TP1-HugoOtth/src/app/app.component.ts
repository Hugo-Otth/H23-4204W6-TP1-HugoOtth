import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Deux variables devront être ajoutées ici
  result = false;
  artist : string = "";
  similarArtists : string[] = [];
  // Le constructeur devra être ajouté ici
  constructor(public http : HttpClient){}

  searchArtist():void{
    this.request();
    this.result = true;
  }
	// La requête HTTP devra être ajoutée ici
	async request() : Promise<void>{
    let input = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + this.artist + "&api_key=e34ebf8561ba7c653a21d1d99a1a0070&format=json"));
    this.similarArtists = [];
    for(let artist of input.similarartists.artist){
      this.similarArtists.push(artist.name);
    }
  }

  newSearch():void{
    this.result = false;
  }
}

export class Album {
  nom : string = "";
}

export class Chanson {
  titre : string = "";
}
