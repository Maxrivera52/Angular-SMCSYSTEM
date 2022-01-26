import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class STareaService {
  private url: string = 'http://localhost:8070/tareaAlumno';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url);
  }
  create(tbl: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.url, tbl);
  }
  get(idtbl: number): Observable<Tarea> {
    return this.http.get<Tarea>(this.url + '/' + idtbl);
  }
  getByIdAlumno(idtbl: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url + '/idAlumno/' + idtbl);
  }
  update(tbl: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(this.url, tbl);
  }
  delete(idtbl: number): Observable<Tarea> {
    return this.http.delete<Tarea>(this.url + '/' + idtbl);
  }
}
