import { Component, OnInit } from '@angular/core';

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

  constructor(private alumnoservice: AlumnoService, private router: Router) { }

  ngOnInit(): void {

    this.alumnoservice.getAll().subscribe(
      result => this.alumnocl = result);
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
