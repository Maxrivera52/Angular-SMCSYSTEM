import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class SRolService {

  constructor(private http:HttpClient) { }

  url = "http://127.0.0.1:8070/rol";


  getAll():Observable<Rol[]>{
    const params = `/listar`;
    return this.http.get<Rol[]>(this.url+params);
  }

  getById(id:Number):Observable<Rol>{
    const params = `/find/${id}`;
    return this.http.get<Rol>(this.url+params);
  }

}
