import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodocl } from '../models/periodocl';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private url: string = 'http://localhost:8070/rest_periodos';

  constructor(private http: HttpClient) {}

  // LISTAR PERIODOS
  getAll(): Observable<Periodocl[]> {
    return this.http.get<Periodocl[]>(this.url);
  }
  // CREAR PERIODO
  create(periodo: Periodocl): Observable<Periodocl> {
    return this.http.post<Periodocl>(this.url, periodo);
  }
  // BUSCAR PERIODO
  get(idperiodo: number): Observable<Periodocl> {
    return this.http.get<Periodocl>(this.url + '/' + idperiodo);
  }

  // MODIFICAR PERIODO
  update(periodo: Periodocl): Observable<Periodocl> {
    return this.http.put<Periodocl>(this.url, periodo);
  }
  // ELIMINAR PERIODO
  delete(idperiodo: number): Observable<Periodocl> {
    return this.http.delete<Periodocl>(this.url + '/' + idperiodo);
  }

}
