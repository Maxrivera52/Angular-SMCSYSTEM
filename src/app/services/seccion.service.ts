import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Seccioncl } from '../models/seccioncl';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  seccionActualizar = new Subject<Seccioncl[]>();
  private url: string = 'http://localhost:8070/rest_seccion';

  constructor(private http: HttpClient) {}

  // LISTAR SECCION
  getAll(): Observable<Seccioncl[]> {
    return this.http.get<Seccioncl[]>(this.url);
  }
  // CREAR SECCION
  create(seccion: Seccioncl): Observable<Seccioncl> {
    return this.http.post<Seccioncl>(this.url, seccion);
  }
  // BUSCAR SECCION
  get(idseccion: number): Observable<Seccioncl> {
    return this.http.get<Seccioncl>(this.url + '/' + idseccion);
  }

  // MODIFICAR SECCION
  update(seccion: Seccioncl): Observable<Seccioncl> {
    return this.http.put<Seccioncl>(this.url, seccion);
  }
  // ELIMINAR SECCION
  delete(idseccion: number): Observable<Seccioncl> {
    return this.http.delete<Seccioncl>(this.url + '/' + idseccion);
  }
}
