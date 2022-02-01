import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleCalificacion } from '../models/detalle-calificacion';

@Injectable({
  providedIn: 'root'
})
export class DetalleCalificacionService {

  private url: string = 'http://localhost:8070/detalleCalificacion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DetalleCalificacion[]> {
    return this.http.get<DetalleCalificacion[]>(this.url);
  }
  create(tbl: DetalleCalificacion): Observable<DetalleCalificacion> {
    return this.http.post<DetalleCalificacion>(this.url, tbl);
  }
  get(idtbl: number): Observable<DetalleCalificacion> {
    return this.http.get<DetalleCalificacion>(this.url + '/' + idtbl);
  }
  getByPeriodesinCurrentYear(curso:number,seccion:number): Observable<DetalleCalificacion[]> {
    //http://localhost:8070/detalleCalificacion/periodosActivosRangoAnio?inicio=01-01-2022&cierre=12-12-2022

    return this.http.get<DetalleCalificacion[]>(this.url + `/periodosActivosRangoAnio?seccion=${seccion}&curso=${curso}`);
  }

  saveDetailToAllAlumns(tbl:DetalleCalificacion,idseccion:number){
    return this.http.post<DetalleCalificacion>(this.url+`/saveDetailtoAlumns?idseccion=${idseccion}`, tbl);
  }
  
  update(tbl: DetalleCalificacion): Observable<DetalleCalificacion> {
    return this.http.put<DetalleCalificacion>(this.url, tbl);
  }
  delete(idtbl: number): Observable<DetalleCalificacion> {
    return this.http.delete<DetalleCalificacion>(this.url + '/' + idtbl);
  }
}
