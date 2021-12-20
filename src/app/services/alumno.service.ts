import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumnocl } from '../models/alumnocl';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url: string = 'http://localhost:8070/rest_alumnos';

  constructor(private http: HttpClient) {}

  // LISTAR ALUMNOS
  getAll(): Observable<Alumnocl[]> {
    return this.http.get<Alumnocl[]>(this.url);
  }
  // CREAR ALUMNO
  create(alumno: Alumnocl): Observable<Alumnocl> {
    return this.http.post<Alumnocl>(this.url, alumno);
  }
  // BUSCAR ALUMNO
  get(idalumno: number): Observable<Alumnocl> {
    return this.http.get<Alumnocl>(this.url + '/' + idalumno);
  }

  // BUSCAR ALUMNO POR DNI
  getDni(dni: String): Observable<Alumnocl> {
    return this.http.get<Alumnocl>(this.url + '/' + dni);
  }

  // MODIFICAR ALUMNO
  update(alumno: Alumnocl): Observable<Alumnocl> {
    return this.http.put<Alumnocl>(this.url, alumno);
  }
  // ELIMINAR ALUMNO
  delete(idalumno: number): Observable<Alumnocl> {
    return this.http.delete<Alumnocl>(this.url + '/' + idalumno);
  }

  ////
  getByUser(id:number):Observable<Alumnocl>{
    const params = `/iduser/${id}`;
    return this.http.get<Alumnocl>(this.url+params);
  }
}
