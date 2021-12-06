import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gradocl } from '../models/gradocl';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  private url: string = 'http://localhost:8070/rest_grados';

  constructor(private http: HttpClient) {}

  // LISTAR GRADOS
  getAll(): Observable<Gradocl[]> {
    return this.http.get<Gradocl[]>(this.url);
  }
  // CREAR GRADO
  create(grado: Gradocl): Observable<Gradocl> {
    return this.http.post<Gradocl>(this.url, grado);
  }
  // BUSCAR GRADO
  get(idgrado: number): Observable<Gradocl> {
    return this.http.get<Gradocl>(this.url + '/' + idgrado);
  }

  // MODIFICAR GRADO
  update(grado: Gradocl): Observable<Gradocl> {
    return this.http.put<Gradocl>(this.url, grado);
  }
  // ELIMINAR GRADO
  delete(idgrado: number): Observable<Gradocl> {
    return this.http.delete<Gradocl>(this.url + '/' + idgrado);
  }
}
