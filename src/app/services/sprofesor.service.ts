import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class SprofesorService {
  url = "http://127.0.0.1:8070/profesor";

  constructor(private http:HttpClient) { }

  getAll():Observable<Profesor[]>{
    const params = `/listar`;
    return this.http.get<Profesor[]>(this.url+params);
  }

  getById(id:number):Observable<Profesor>{
    const params = `/find/${id}`
    return this.http.get<Profesor>(this.url+params);
  }

  save(usu:Profesor):Observable<Profesor>{
    const params = `/save`;
    return this.http.post<Profesor>(this.url+params,usu);
  }
  update(usu:Profesor):Observable<Profesor>{
    const params = `/update`;
    return this.http.put<Profesor>(this.url+params,usu);
  }
  
  delete(id:Number){
    const params = `/delete/${id}`;
    this.http.delete(this.url+params)
  }

  ////
  getByUser(id:number):Observable<Profesor>{
    const params = `/iduser/${id}`;
    return this.http.get<Profesor>(this.url+params);
  }

}
