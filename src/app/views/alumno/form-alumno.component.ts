import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumnocl } from 'src/app/models/alumnocl';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css']
})
export class FormAlumnoComponent implements OnInit {

  //form:FormGroup;
  alumno: Alumnocl = new Alumnocl();
  titulo: string = "Registro de Alumno";

  constructor(private alumnoservice: AlumnoService, private router: Router, private activatedrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  // CARGAR ALUMNO
  cargar(): void {
    this.activatedrouter.params.subscribe(
      e => {
        let idalumno = e['idalumno'];
        if (idalumno) {
          this.alumnoservice.get(idalumno).subscribe(
            es => this.alumno = es
          );
        }
      }
    )
  }
  
  // NUEVO ALUMNO
  create(): void {
    console.log("CREACION DE REGISTRO");
    console.log(this.alumno);

    this.alumnoservice.create(this.alumno).subscribe(
      res => this.router.navigate(['/alumno'])
    );
  }

  //ACTUALIZAR ALUMNO
  update(): void {
    console.log("MODIFICACION DE REGISTRO");
    console.log(this.alumno);

    this.alumnoservice.update(this.alumno).subscribe(
      res => this.router.navigate(['/alumno'])
    );

  }

  // Validaciones

  /*private buildForm(){
    this.form = this.formBuilder.group({

    })
  }*/


}
