import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleProfesorSeccion } from '../models/detalle-profesor-seccion';

@Injectable({
  providedIn: 'root'
})
export class SdetalleProfesorSeccionService {

  url = "http://127.0.0.1:8070/profesorSeccion";

  constructor(private http:HttpClient) { }

  getAll():Observable<DetalleProfesorSeccion[]>{
    return this.http.get<DetalleProfesorSeccion[]>(this.url);
  }

  getById(id:number):Observable<DetalleProfesorSeccion>{
    const params = `/${id}`
    return this.http.get<DetalleProfesorSeccion>(this.url+params);
  }

  save(usu:DetalleProfesorSeccion):Observable<DetalleProfesorSeccion>{
    return this.http.post<DetalleProfesorSeccion>(this.url,usu);
  }
  update(usu:DetalleProfesorSeccion):Observable<DetalleProfesorSeccion>{
    return this.http.put<DetalleProfesorSeccion>(this.url,usu);
  }
  
  delete(id:Number){
    const params = `/${id}`;
    this.http.delete(this.url+params)
  }

  
}
