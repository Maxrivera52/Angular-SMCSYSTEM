import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gradocl } from 'src/app/models/gradocl';
import { GradoService } from 'src/app/services/grado.service';


@Component({
  selector: 'app-form-grado',
  templateUrl: './form-grado.component.html',
  styleUrls: ['./form-grado.component.css']
})
export class FormGradoComponent implements OnInit {

  grado: Gradocl = new Gradocl();
  titulo: string = "Registro de Grado";

  constructor(private gradoservice: GradoService, private router: Router, private activatedrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  // CARGAR GRADO
  cargar(): void {
    this.activatedrouter.params.subscribe(
      e => {
        let idgrado = e['idgrado'];
        if (idgrado) {
          this.gradoservice.get(idgrado).subscribe(
            es => this.grado = es
          );
        }
      }
    )
  }
  
  // NUEVO GRADO
  create(): void {
    console.log("CREACION DE REGISTRO");
    console.log(this.grado);

    this.gradoservice.create(this.grado).subscribe(
      res => this.router.navigate(['/grado'])
    );
  }

  //ACTUALIZAR GRADO
  update(): void {
    console.log("MODIFICACION DE REGISTRO");
    console.log(this.grado);

    this.gradoservice.update(this.grado).subscribe(
      res => this.router.navigate(['/grado'])
    );

  }


}
