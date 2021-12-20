import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nivelcl } from '../models/nivelcl';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  private url: string = 'http://localhost:8070/rest_nivel';

  constructor(private http: HttpClient) {}

  // LISTAR NIVELES
  getAll(): Observable<Nivelcl[]> {
    return this.http.get<Nivelcl[]>(this.url);
  }
  // CREAR NIVEL
  create(nivel: Nivelcl): Observable<Nivelcl> {
    return this.http.post<Nivelcl>(this.url, nivel);
  }
  // BUSCAR NIVEL
  get(idnivel: number): Observable<Nivelcl> {
    return this.http.get<Nivelcl>(this.url + '/' + idnivel);
  }

  // MODIFICAR NIVEL
  update(nivel: Nivelcl): Observable<Nivelcl> {
    return this.http.put<Nivelcl>(this.url, nivel);
  }
  // ELIMINAR NIVEL
  delete(idnivel: number): Observable<Nivelcl> {
    return this.http.delete<Nivelcl>(this.url + '/' + idnivel);
  }

}
