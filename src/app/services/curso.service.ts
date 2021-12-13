import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursocl } from '../models/cursocl';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private url: string = 'http://localhost:8070/rest_cursos';

  constructor(private http: HttpClient) {}

  // LISTAR CURSOS
  getAll(): Observable<Cursocl[]> {
    return this.http.get<Cursocl[]>(this.url);
  }
  // CREAR CURSO
  create(curso: Cursocl): Observable<Cursocl> {
    return this.http.post<Cursocl>(this.url, curso);
  }
  // BUSCAR CURSO
  get(idcurso: number): Observable<Cursocl> {
    return this.http.get<Cursocl>(this.url + '/' + idcurso);
  }

  // MODIFICAR CURSO
  update(curso: Cursocl): Observable<Cursocl> {
    return this.http.put<Cursocl>(this.url, curso);
  }
  // ELIMINAR CURSO
  delete(idcurso: number): Observable<Cursocl> {
    return this.http.delete<Cursocl>(this.url + '/' + idcurso);
  }

}
