import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gradocl } from 'src/app/models/gradocl';
import { GradoService } from 'src/app/services/grado.service';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {

  gradocl = null as any;
  dataSource!: MatTableDataSource<Gradocl>;

  constructor(private gradoservice: GradoService, private router: Router) { }

  ngOnInit(): void {

    this.gradoservice.getAll().subscribe(
      result => this.gradocl = result);
    
    //this.dataSource = new MatTableDataSource(this.gradocl);
  }

  // FILTRO DE BUSQUEDA
  filtrar(valor: String) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  //ELIMINAR GRADO
  delete(grado: Gradocl): void {
    console.log("Inhabilitar Grado");

    this.gradoservice.delete(grado.idgrado).subscribe(
      res => this.gradoservice.getAll().subscribe(
        response => this.gradocl = response
      )
    );
  }

}
