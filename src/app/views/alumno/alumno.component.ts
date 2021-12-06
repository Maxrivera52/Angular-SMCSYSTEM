import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumnocl } from 'src/app/models/alumnocl';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumnocl = null as any;
  //dataSource = null as any;
  dataSource!: MatTableDataSource<Alumnocl>;

  constructor(private alumnoservice: AlumnoService, private router: Router) { }

  ngOnInit(): void {

    this.alumnoservice.getAll().subscribe(
      result => this.alumnocl = result);
    
    //this.dataSource = new MatTableDataSource(this.alumnocl);
  }

  // FILTRO DE BUSQUEDA
  filtrar(valor: String) {
    this.dataSource.filter = valor.trim().toLowerCase();
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