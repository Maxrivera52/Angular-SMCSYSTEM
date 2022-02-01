import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Seccioncl } from '../models/seccioncl';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  seccionActualizar = new Subject<Seccioncl[]>();
  private url: string = 'http://localhost:8070/seccion';

  constructor(private http: HttpClient) {}

  // LISTAR SECCION
  getAll(): Observable<Seccioncl[]> {
    const params = `/listar`;
    return this.http.get<Seccioncl[]>(this.url+params);
  }
  // CREAR SECCION
  create(seccion: Seccioncl): Observable<Seccioncl> {
    const params = `/save`;
    return this.http.post<Seccioncl>(this.url+params, seccion);
  }
  // BUSCAR SECCION
  get(idseccion: number): Observable<Seccioncl> {
    const params = `/find/${idseccion}`;
    return this.http.get<Seccioncl>(this.url + params);
  }

  getByIdGrado(id: number): Observable<Seccioncl[]> {
    const params = `/grado/${id}`;
    return this.http.get<Seccioncl[]>(this.url + params);
  }


  // MODIFICAR SECCION
  update(seccion: Seccioncl): Observable<Seccioncl> {
    const params = `/update`;
    return this.http.put<Seccioncl>(this.url+params, seccion);
  }
  // ELIMINAR SECCION
  delete(idseccion: number): Observable<Seccioncl> {
    const params = `/delete/${idseccion}`;
    return this.http.delete<Seccioncl>(this.url + params);
  }
}
