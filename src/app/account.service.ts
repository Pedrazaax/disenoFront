import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private httpClient : HttpClient) { }

  register(info:any) : Observable<any> {
    //Llamada asincrona, es decir, ejecuta el método en otro hilo. Produce un objeto observable.
    //Se ejecuta cuando la respuesta llegue del back. El Observable espera siendo un hilo.
    return this.httpClient.post("http://localhost/users/register", info)
  }

  login(info:any) : Observable<any> {
    return this.httpClient.put("http://localhost/users/login", info)
  }

}
