import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name?: string
  pwd1?: string
  message?: string
  loginCorrecto?: Boolean
  private ws?: WebSocket

  constructor(private accountService : AccountService, private gamesService : GamesService){

  }

  ngOnInit(): void {
      
  }

  login(){

    let info = {
      name : this.name,
      pwd1 : this.pwd1
    }
    
    this.accountService.login(info).subscribe(
      respuesta => {
        this.message = "Hola " + this.name
        this.loginCorrecto = true
        sessionStorage.setItem("player", this.name!)
      },
      error => (
        this.message = "Ha habido un error",
        this.loginCorrecto = false
      )
    )

  }

  requestGame() {
    this.gamesService.requestGame().subscribe(
      respuesta => {
        sessionStorage.setItem("idMatch", respuesta.id)
        alert(respuesta.id)
        console.log(respuesta)
        this.prepareWebSocket()
      },
      error => (
        this.message = "Ha habido un error"
      )
    )
  }

  prepareWebSocket(){
    this.ws = new WebSocket("http://localhost/wsGames")
    this.ws.onopen = function() {
      console.log("WS abierto")
    }

    this.ws.onmessage = function(event) {
      console.log("Mensaje recibido: " + JSON.stringify(event.data))
    }

    this.ws.onclose = function() {
      console.log("WS cerrado")
    }

    this.ws.onerror = function(event) {
      console.log("Error en WS" + JSON.stringify(event))
    }

  }

}
