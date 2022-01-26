import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class SCalificacionService {

  private url: string = 'http://localhost:8070/calificacionesAlumno';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.url);
  }
  create(tbl: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(this.url, tbl);
  }
  get(idtbl: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(this.url + '/' + idtbl);
  }
  getByIdPeriodo(idtbl: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(this.url + '/byIdPeriodo/' + idtbl);
  }
  update(tbl: Calificacion): Observable<Calificacion> {
    return this.http.put<Calificacion>(this.url, tbl);
  }
  delete(idtbl: number): Observable<Calificacion> {
    return this.http.delete<Calificacion>(this.url + '/' + idtbl);
  }
}
