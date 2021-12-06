import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumnocl } from 'src/app/models/alumnocl';
import { filter } from 'rxjs';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumnocl = null as any;
  //dataSource = null as any;
  displayedColumns: string[] = ['idalumno', 'nombre', 'apellido', 'dni', 'telefono', 'estado'];
  dataSource!: MatTableDataSource<Alumnocl>

  constructor(private alumnoservice: AlumnoService, private router: Router) { }

  ngOnInit(): void {

    this.alumnoservice.getAll().subscribe(
      result => this.alumnocl = result);
    
    //this.dataSource = new MatTableDataSource(this.alumnocl);
  }

  // FILTRO DE BUSQUEDA
  filtrar() {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter) =>{
      let dataStr = data.idalumno + data.nombre + data.apellido +
      data.dni + data.telefono + data.estado;
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  //ELIMINAR ALUMNO
  delete(alumno: Alumnocl): void {
    console.log("Inhabilitar Alumno");

    this.alumnoservice.delete(alumno.idalumno).subscribe(
      res => this.alumnoservice.getAll().subscribe(
        response => this.alumnocl = response
      )
    );
  }

}