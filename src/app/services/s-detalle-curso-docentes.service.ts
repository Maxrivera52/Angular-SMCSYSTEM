import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleCursoDocente } from '../models/detalle-curso-docente';

@Injectable({
  providedIn: 'root'
})
export class SDetalleCursoDocentesService {

  url = "http://127.0.0.1:8070/detalle_curso_docente";

  constructor(private http:HttpClient) { }

  getAll():Observable<DetalleCursoDocente[]>{
    return this.http.get<DetalleCursoDocente[]>(this.url);
  }

  getById(id:number):Observable<DetalleCursoDocente>{
    const params = `/${id}`
    return this.http.get<DetalleCursoDocente>(this.url+params);
  }

  getDetailByiddocente(id:string):Observable<DetalleCursoDocente[]>{
    const params = `/querydocente/${id}`
    return this.http.get<DetalleCursoDocente[]>(this.url+params);
  }

  save(usu:DetalleCursoDocente):Observable<DetalleCursoDocente>{
    return this.http.post<DetalleCursoDocente>(this.url,usu);
  }
  update(usu:DetalleCursoDocente):Observable<DetalleCursoDocente>{
    return this.http.put<DetalleCursoDocente>(this.url,usu);
  }
  
  delete(id:Number){
    const params = `/${id}`;
    this.http.delete(this.url+params)
  }

}
