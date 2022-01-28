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
    const params = `/listar`;
    return this.http.get<Usuario[]>(this.url+params);
  }

  getById(id:number):Observable<Usuario>{
    const params = `/find/${id}`
    return this.http.get<Usuario>(this.url+params);
  }

  save(usu:Usuario):Observable<Usuario>{
    const params = `/save`;
    return this.http.post<Usuario>(this.url+params,usu);
  }

  /*
  existUserByEmail(email:string):Observable<string>{
    const params = `/existUserByEmail?email=${email}`;
    return this.http.get<string>(this.url+params);
  }


*/
  sendRecoveryEmail(email:string):Observable<string>{
    const params = `/sendRecoveryEmail?email=${email}`;
    return this.http.get(this.url+params,{responseType: 'text'});
  }


  verifyKeyCode(email:string,keycode:string):Observable<string>{
    const params = `/verifyRecoveryCode?email=${email}&keycode=${keycode}`;
    return this.http.get(this.url+params,{responseType: 'text'});
  }

  recoverUserWithCredentials(email:string,keycode:string,password:string):Observable<string>{
    const params = `/recoverUserWithCredentials?keycode=${keycode}&email=${email}&password=${password}`;
    return this.http.get(this.url+params,{responseType: 'text'});
  }

}
