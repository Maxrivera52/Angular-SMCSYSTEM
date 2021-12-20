import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anioescolarcl } from '../models/anioescolarcl';

@Injectable({
  providedIn: 'root'
})
export class AnioescolarService {

  private url: string = 'http://localhost:8070/rest_anios';

  constructor(private http: HttpClient) {}

  // LISTAR AÑOS ESCOLARES
  getAll(): Observable<Anioescolarcl[]> {
    return this.http.get<Anioescolarcl[]>(this.url);
  }
  // CREAR AÑOS ESCOLARES
  create(anio: Anioescolarcl): Observable<Anioescolarcl> {
    return this.http.post<Anioescolarcl>(this.url, anio);
  }
  // BUSCAR AÑOS ESCOLARES
  get(idanio: number): Observable<Anioescolarcl> {
    return this.http.get<Anioescolarcl>(this.url + '/' + idanio);
  }

  // MODIFICAR AÑOS ESCOLARES
  update(anio: Anioescolarcl): Observable<Anioescolarcl> {
    return this.http.put<Anioescolarcl>(this.url, anio);
  }
  // ELIMINAR AÑOS ESCOLARES
  delete(idanio: number): Observable<Anioescolarcl> {
    return this.http.delete<Anioescolarcl>(this.url + '/' + idanio);
  }

}
