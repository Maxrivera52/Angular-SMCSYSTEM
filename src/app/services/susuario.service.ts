import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SUsuarioService {

  url = "http://127.0.0.1:8070/usuario";

  constructor(private http:HttpClient) { }

  loginUser(correo:string,clave:string):Observable<Usuario>{
    const params = `/login?correo=${correo}&clave=${clave}`;
    return this.http.get<Usuario>(this.url+params);
  }

  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  getById(id:number):Observable<Usuario>{
    const params = `/find/${id}`
    return this.http.get<Usuario>(this.url+params);
  }

  

}
