import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpClient : HttpClient) { }

  requestGame(): Observable<any> {
    return this.httpClient.get<any>("http://localhost/games/requestGame?juego=nm&player=" + sessionStorage.getItem("player"));
  }
}
